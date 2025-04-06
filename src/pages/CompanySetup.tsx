
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, Edit, AlertTriangle, Check } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

// Mock data for companies
const initialCompanies = [
  {
    id: 1,
    name: 'Acme Corporation',
    country: 'United States',
    currency: 'USD',
    status: 'Active',
  },
  {
    id: 2,
    name: 'TechCorp Inc.',
    country: 'Canada',
    currency: 'CAD',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Global Foods Ltd',
    country: 'United Kingdom',
    currency: 'GBP',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Quantum Solutions',
    country: 'Australia',
    currency: 'AUD',
    status: 'Inactive',
  },
  {
    id: 5,
    name: 'Northern Manufacturing',
    country: 'Germany',
    currency: 'EUR',
    status: 'Active',
  },
];

const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'];
const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'Japan', 'France', 'Italy'];
const languages = ['English', 'French', 'German', 'Spanish', 'Japanese'];

const CompanySetup = () => {
  const [companies, setCompanies] = useState(initialCompanies);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<any>(null);
  const { toast } = useToast();

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEditCompany = (company: any) => {
    setEditingCompany({ ...company });
    setIsDialogOpen(true);
  };

  const handleAddNewCompany = () => {
    setEditingCompany({
      id: companies.length + 1,
      name: '',
      country: 'United States',
      currency: 'USD',
      status: 'Active',
      selfService: true,
      language: 'English',
    });
    setIsDialogOpen(true);
  };

  const handleSaveCompany = () => {
    if (editingCompany.id) {
      // Update existing company
      setCompanies(
        companies.map((company) =>
          company.id === editingCompany.id ? editingCompany : company
        )
      );
      toast({
        title: 'Company Updated',
        description: `${editingCompany.name} has been updated successfully.`,
      });
    } else {
      // Add new company
      const newCompany = {
        ...editingCompany,
        id: companies.length + 1,
      };
      setCompanies([...companies, newCompany]);
      toast({
        title: 'Company Added',
        description: `${editingCompany.name} has been added successfully.`,
      });
    }
    setIsDialogOpen(false);
  };

  const handleToggleCompanyStatus = (id: number) => {
    setCompanies(
      companies.map((company) => {
        if (company.id === id) {
          const newStatus = company.status === 'Active' ? 'Inactive' : 'Active';
          toast({
            title: `Company ${newStatus}`,
            description: `${company.name} is now ${newStatus.toLowerCase()}.`,
          });
          return { ...company, status: newStatus };
        }
        return company;
      })
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Company Setup</h1>
        <Button onClick={handleAddNewCompany}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Company
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Manage Companies</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search companies..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell className="font-medium">{company.name}</TableCell>
                      <TableCell>{company.country}</TableCell>
                      <TableCell>{company.currency}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            company.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {company.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditCompany(company)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant={company.status === 'Active' ? 'destructive' : 'default'}
                            size="sm"
                            onClick={() => handleToggleCompanyStatus(company.id)}
                          >
                            {company.status === 'Active' ? (
                              <AlertTriangle className="h-4 w-4" />
                            ) : (
                              <Check className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No companies found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingCompany?.id ? 'Edit Company' : 'Add New Company'}
            </DialogTitle>
            <DialogDescription>
              {editingCompany?.id
                ? 'Update company information and settings'
                : 'Enter details to create a new company'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input
                  id="company-name"
                  value={editingCompany?.name || ''}
                  onChange={(e) =>
                    setEditingCompany({ ...editingCompany, name: e.target.value })
                  }
                  placeholder="Enter company name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-country">Country</Label>
                  <Select
                    value={editingCompany?.country || ''}
                    onValueChange={(value) =>
                      setEditingCompany({ ...editingCompany, country: value })
                    }
                  >
                    <SelectTrigger id="company-country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-currency">Primary Currency</Label>
                  <Select
                    value={editingCompany?.currency || ''}
                    onValueChange={(value) =>
                      setEditingCompany({ ...editingCompany, currency: value })
                    }
                  >
                    <SelectTrigger id="company-currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-language">Language</Label>
                  <Select
                    value={editingCompany?.language || 'English'}
                    onValueChange={(value) =>
                      setEditingCompany({ ...editingCompany, language: value })
                    }
                  >
                    <SelectTrigger id="company-language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem key={language} value={language}>
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-status">Status</Label>
                  <Select
                    value={editingCompany?.status || 'Active'}
                    onValueChange={(value) =>
                      setEditingCompany({ ...editingCompany, status: value })
                    }
                  >
                    <SelectTrigger id="company-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="self-service"
                  checked={editingCompany?.selfService || false}
                  onCheckedChange={(checked) =>
                    setEditingCompany({ ...editingCompany, selfService: checked })
                  }
                />
                <Label htmlFor="self-service">Enable Self-Service</Label>
              </div>

              <div className="pt-4">
                <Button variant="outline" onClick={() => {}}>
                  Configure Tax Settings
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCompany}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompanySetup;
