
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { FileText, Download, Printer, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface PayslipType {
  id: string;
  month: string;
  year: string;
  payDate: string;
  basic: number;
  allowances: {
    houseRent: number;
    medical: number;
    transport: number;
    other: number;
  };
  deductions: {
    tax: number;
    providentFund: number;
    loan: number;
    other: number;
  };
  grossPay: number;
  netPay: number;
}

const EmpPayslips = () => {
  const [year, setYear] = useState<string>("2025");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [viewPayslip, setViewPayslip] = useState<PayslipType | null>(null);
  
  // Mock data for payslips
  const payslips: PayslipType[] = [
    {
      id: "PS2025-04",
      month: "April",
      year: "2025",
      payDate: "2025-04-30",
      basic: 2500,
      allowances: {
        houseRent: 500,
        medical: 200,
        transport: 150,
        other: 100
      },
      deductions: {
        tax: 325,
        providentFund: 250,
        loan: 0,
        other: 0
      },
      grossPay: 3450,
      netPay: 2875
    },
    {
      id: "PS2025-03",
      month: "March",
      year: "2025",
      payDate: "2025-03-31",
      basic: 2500,
      allowances: {
        houseRent: 500,
        medical: 200,
        transport: 150,
        other: 0
      },
      deductions: {
        tax: 325,
        providentFund: 250,
        loan: 0,
        other: 0
      },
      grossPay: 3350,
      netPay: 2775
    },
    {
      id: "PS2025-02",
      month: "February",
      year: "2025",
      payDate: "2025-02-28",
      basic: 2500,
      allowances: {
        houseRent: 500,
        medical: 200,
        transport: 150,
        other: 0
      },
      deductions: {
        tax: 325,
        providentFund: 250,
        loan: 0,
        other: 0
      },
      grossPay: 3350,
      netPay: 2775
    }
  ];

  const filterPayslips = () => {
    return payslips
      .filter(payslip => payslip.year === year)
      .filter(payslip => 
        payslip.month.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payslip.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };

  const handleViewPayslip = (payslip: PayslipType) => {
    setViewPayslip(payslip);
  };

  const handleDownloadPDF = (id: string) => {
    // Simulate PDF download functionality
    console.log(`Downloading payslip ${id} as PDF`);
  };

  const handlePrint = () => {
    // Implement print functionality
    window.print();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">My Payslips</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative">
            <Input
              type="search"
              placeholder="Search payslips..."
              className="w-full sm:w-48"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Payslip History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Month</TableHead>
                <TableHead>Pay Date</TableHead>
                <TableHead className="text-right">Net Pay</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterPayslips().length > 0 ? (
                filterPayslips().map((payslip) => (
                  <TableRow key={payslip.id}>
                    <TableCell className="font-medium">{payslip.id}</TableCell>
                    <TableCell>{payslip.month} {payslip.year}</TableCell>
                    <TableCell>{new Date(payslip.payDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">{formatCurrency(payslip.netPay)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleViewPayslip(payslip)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleDownloadPDF(payslip.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    No payslips found for the selected filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={viewPayslip !== null} onOpenChange={(open) => !open && setViewPayslip(null)}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>Payslip for {viewPayslip?.month} {viewPayslip?.year}</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => viewPayslip && handleDownloadPDF(viewPayslip.id)}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrint}
                >
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          {viewPayslip && (
            <div className="space-y-4 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">Employee</h3>
                  <p>John Doe</p>
                  <p>ID: EMP001</p>
                  <p>Department: Engineering</p>
                </div>
                <div className="text-right">
                  <h3 className="font-bold">Pay Period</h3>
                  <p>{viewPayslip.month} 1-30, {viewPayslip.year}</p>
                  <p>Pay Date: {new Date(viewPayslip.payDate).toLocaleDateString()}</p>
                  <p>Payslip ID: {viewPayslip.id}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Earnings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Basic Salary</span>
                        <span>{formatCurrency(viewPayslip.basic)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>House Rent Allowance</span>
                        <span>{formatCurrency(viewPayslip.allowances.houseRent)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Medical Allowance</span>
                        <span>{formatCurrency(viewPayslip.allowances.medical)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Transport Allowance</span>
                        <span>{formatCurrency(viewPayslip.allowances.transport)}</span>
                      </div>
                      {viewPayslip.allowances.other > 0 && (
                        <div className="flex justify-between">
                          <span>Other Allowances</span>
                          <span>{formatCurrency(viewPayslip.allowances.other)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold pt-2 border-t mt-2">
                        <span>Gross Earnings</span>
                        <span>{formatCurrency(viewPayslip.grossPay)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Deductions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Income Tax</span>
                        <span>{formatCurrency(viewPayslip.deductions.tax)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Provident Fund</span>
                        <span>{formatCurrency(viewPayslip.deductions.providentFund)}</span>
                      </div>
                      {viewPayslip.deductions.loan > 0 && (
                        <div className="flex justify-between">
                          <span>Loan Repayment</span>
                          <span>{formatCurrency(viewPayslip.deductions.loan)}</span>
                        </div>
                      )}
                      {viewPayslip.deductions.other > 0 && (
                        <div className="flex justify-between">
                          <span>Other Deductions</span>
                          <span>{formatCurrency(viewPayslip.deductions.other)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold pt-2 border-t mt-2">
                        <span>Total Deductions</span>
                        <span>{formatCurrency(
                          viewPayslip.deductions.tax + 
                          viewPayslip.deductions.providentFund + 
                          viewPayslip.deductions.loan + 
                          viewPayslip.deductions.other
                        )}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Net Pay</span>
                    <span className="text-lg font-bold">{formatCurrency(viewPayslip.netPay)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmpPayslips;
