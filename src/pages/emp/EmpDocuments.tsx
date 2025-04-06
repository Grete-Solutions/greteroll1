
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Download, FileText, Bookmark, User, Search } from 'lucide-react';
import { format } from 'date-fns';

interface Document {
  id: string;
  title: string;
  category: string;
  uploadDate: Date;
  uploadedBy: string;
  fileName: string;
  fileSize: string;
}

const EmpDocuments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Mock data for company documents
  const documents: Document[] = [
    {
      id: 'DOC-001',
      title: 'Employee Handbook 2025',
      category: 'Policies',
      uploadDate: new Date('2025-01-10'),
      uploadedBy: 'HR Department',
      fileName: 'employee_handbook_2025.pdf',
      fileSize: '2.4 MB'
    },
    {
      id: 'DOC-002',
      title: 'Tax Guidelines for Employees',
      category: 'Finance',
      uploadDate: new Date('2025-02-15'),
      uploadedBy: 'Finance Department',
      fileName: 'tax_guidelines_2025.pdf',
      fileSize: '1.8 MB'
    },
    {
      id: 'DOC-003',
      title: 'Company Holiday Schedule 2025',
      category: 'HR',
      uploadDate: new Date('2025-01-05'),
      uploadedBy: 'HR Department',
      fileName: 'holiday_schedule_2025.pdf',
      fileSize: '0.5 MB'
    },
    {
      id: 'DOC-004',
      title: 'Health Benefits Guide',
      category: 'Benefits',
      uploadDate: new Date('2025-03-01'),
      uploadedBy: 'HR Department',
      fileName: 'health_benefits_guide.pdf',
      fileSize: '3.2 MB'
    },
    {
      id: 'DOC-005',
      title: 'Data Security Policy',
      category: 'IT',
      uploadDate: new Date('2025-02-20'),
      uploadedBy: 'IT Department',
      fileName: 'data_security_policy.pdf',
      fileSize: '1.1 MB'
    },
    {
      id: 'DOC-006',
      title: 'Expense Claim Procedure',
      category: 'Finance',
      uploadDate: new Date('2025-03-10'),
      uploadedBy: 'Finance Department',
      fileName: 'expense_claim_procedure.pdf',
      fileSize: '0.9 MB'
    },
    {
      id: 'DOC-007',
      title: 'Code of Conduct',
      category: 'Policies',
      uploadDate: new Date('2025-01-15'),
      uploadedBy: 'HR Department',
      fileName: 'code_of_conduct.pdf',
      fileSize: '1.5 MB'
    }
  ];
  
  // Get unique categories for the filter options
  const categories = Array.from(new Set(documents.map(doc => doc.category)));
  
  const handleDownload = (fileName: string) => {
    console.log(`Downloading ${fileName}...`);
    // Simulate file download
    setTimeout(() => {
      console.log(`Downloaded ${fileName} successfully`);
    }, 1000);
  };
  
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Policies': return <Bookmark className="h-4 w-4 text-purple-500" />;
      case 'Finance': return <FileText className="h-4 w-4 text-green-500" />;
      case 'HR': return <User className="h-4 w-4 text-blue-500" />;
      case 'Benefits': return <FileText className="h-4 w-4 text-orange-500" />;
      case 'IT': return <FileText className="h-4 w-4 text-red-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const filteredDocuments = documents.filter(doc => {
    // Filter by category
    if (categoryFilter !== 'all' && doc.category !== categoryFilter) return false;
    
    // Filter by search term
    if (searchTerm && !doc.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    return true;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Company Documents</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Document Library</CardTitle>
          <CardDescription>Access company policies, guidelines, and other important documents</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex gap-4">
              <div className="w-[180px]">
                <Label htmlFor="category-filter" className="mb-2 block">Category</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger id="category-filter">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="w-full sm:w-[280px]">
              <Label htmlFor="search" className="mb-2 block">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {doc.title}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(doc.category)}
                        {doc.category}
                      </div>
                    </TableCell>
                    <TableCell>{format(doc.uploadDate, 'MMM d, yyyy')}</TableCell>
                    <TableCell>{doc.uploadedBy}</TableCell>
                    <TableCell>{doc.fileSize}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownload(doc.fileName)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    No documents found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recently Added</CardTitle>
          <CardDescription>Documents added in the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents
              .filter(doc => doc.uploadDate > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
              .slice(0, 4)
              .map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="p-4 flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{doc.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {doc.category} • {format(doc.uploadDate, 'MMM d, yyyy')}
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDownload(doc.fileName)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmpDocuments;
