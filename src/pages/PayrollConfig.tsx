
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
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';

const PayrollConfig = () => {
  const [payrollFrequency, setPayrollFrequency] = useState({
    monthly: true,
    weekly: false,
    biweekly: true
  });
  
  const [deductions, setDeductions] = useState([
    { id: 1, name: 'Income Tax', type: 'Percentage', rate: '15%', taxable: false },
    { id: 2, name: 'Health Insurance', type: 'Fixed', rate: '$150', taxable: true },
    { id: 3, name: 'Retirement Plan', type: 'Percentage', rate: '5%', taxable: true }
  ]);

  const [benefits, setBenefits] = useState([
    { id: 1, name: 'Transportation Allowance', type: 'Fixed', rate: '$100', taxable: true },
    { id: 2, name: 'Meal Allowance', type: 'Fixed', rate: '$200', taxable: true },
    { id: 3, name: 'Performance Bonus', type: 'Percentage', rate: '10%', taxable: true }
  ]);

  const [newItem, setNewItem] = useState({
    name: '',
    type: 'Fixed',
    rate: '',
    taxable: false
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('deductions');

  const handleFrequencyChange = (key: keyof typeof payrollFrequency) => {
    setPayrollFrequency(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAddItem = () => {
    if (newItem.name && newItem.rate) {
      const item = {
        id: Date.now(),
        name: newItem.name,
        type: newItem.type,
        rate: newItem.type === 'Percentage' ? `${newItem.rate}%` : `$${newItem.rate}`,
        taxable: newItem.taxable
      };

      if (currentTab === 'deductions') {
        setDeductions(prev => [...prev, item]);
      } else {
        setBenefits(prev => [...prev, item]);
      }

      setNewItem({
        name: '',
        type: 'Fixed',
        rate: '',
        taxable: false
      });
      
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Payroll Configurations</CardTitle>
          <CardDescription>
            Define default payroll structures or review existing settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Payroll Frequency Options</h3>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="monthly" 
                  checked={payrollFrequency.monthly}
                  onCheckedChange={() => handleFrequencyChange('monthly')} 
                />
                <Label htmlFor="monthly">Monthly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="weekly" 
                  checked={payrollFrequency.weekly}
                  onCheckedChange={() => handleFrequencyChange('weekly')} 
                />
                <Label htmlFor="weekly">Weekly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="biweekly" 
                  checked={payrollFrequency.biweekly}
                  onCheckedChange={() => handleFrequencyChange('biweekly')} 
                />
                <Label htmlFor="biweekly">Bi-weekly</Label>
              </div>
            </div>
          </div>

          <div>
            <Tabs defaultValue="deductions" onValueChange={setCurrentTab}>
              <div className="flex justify-between items-center mb-3">
                <TabsList>
                  <TabsTrigger value="deductions">Deductions</TabsTrigger>
                  <TabsTrigger value="benefits">Benefits</TabsTrigger>
                </TabsList>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add New
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Add New {currentTab === 'deductions' ? 'Deduction' : 'Benefit'}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input 
                          id="name" 
                          value={newItem.name}
                          onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                          className="col-span-3" 
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">Type</Label>
                        <Select 
                          value={newItem.type}
                          onValueChange={(value) => setNewItem(prev => ({ ...prev, type: value }))}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Fixed">Fixed</SelectItem>
                            <SelectItem value="Percentage">Percentage</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="rate" className="text-right">
                          {newItem.type === 'Fixed' ? 'Amount ($)' : 'Rate (%)'}
                        </Label>
                        <Input 
                          id="rate" 
                          value={newItem.rate}
                          onChange={(e) => setNewItem(prev => ({ ...prev, rate: e.target.value }))}
                          className="col-span-3" 
                          type="number"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="taxable" className="text-right">Taxable</Label>
                        <div className="col-span-3 flex items-center space-x-2">
                          <Checkbox 
                            id="taxable" 
                            checked={newItem.taxable}
                            onCheckedChange={(checked) => 
                              setNewItem(prev => ({ ...prev, taxable: checked === true }))}
                          />
                          <Label htmlFor="taxable">Yes</Label>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={handleAddItem}>Add</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <TabsContent value="deductions">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Rate/Amount</TableHead>
                      <TableHead>Taxable</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deductions.map((deduction) => (
                      <TableRow key={deduction.id}>
                        <TableCell>{deduction.name}</TableCell>
                        <TableCell>{deduction.type}</TableCell>
                        <TableCell>{deduction.rate}</TableCell>
                        <TableCell>{deduction.taxable ? 'Yes' : 'No'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="benefits">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Rate/Amount</TableHead>
                      <TableHead>Taxable</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {benefits.map((benefit) => (
                      <TableRow key={benefit.id}>
                        <TableCell>{benefit.name}</TableCell>
                        <TableCell>{benefit.type}</TableCell>
                        <TableCell>{benefit.rate}</TableCell>
                        <TableCell>{benefit.taxable ? 'Yes' : 'No'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Overtime Policies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="overtime-rate">Overtime Rate (x hourly rate)</Label>
                <Input id="overtime-rate" defaultValue="1.5" type="number" step="0.1" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="overtime-threshold">Weekly Overtime Threshold (hours)</Label>
                <Input id="overtime-threshold" defaultValue="40" type="number" className="mt-1" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto">Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PayrollConfig;
