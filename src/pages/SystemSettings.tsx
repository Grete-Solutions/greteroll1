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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { FileDown, Database, Shield, Cog, Languages, Users, Palette, Clock, Calendar, Upload } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const SystemSettings = () => {
  const isMobile = useIsMobile();
  
  const [roles, setRoles] = useState([
    { id: 1, name: 'Super Admin', users: 2 },
    { id: 2, name: 'Company Admin', users: 15 },
    { id: 3, name: 'Manager', users: 42 },
    { id: 4, name: 'Employee', users: 358 }
  ]);

  const [permissions, setPermissions] = useState({
    dashboard: { superAdmin: true, companyAdmin: true, manager: true, employee: true },
    companies: { superAdmin: true, companyAdmin: false, manager: false, employee: false },
    employees: { superAdmin: true, companyAdmin: true, manager: true, employee: false },
    payroll: { superAdmin: true, companyAdmin: true, manager: false, employee: false },
    reports: { superAdmin: true, companyAdmin: true, manager: true, employee: false },
    settings: { superAdmin: true, companyAdmin: false, manager: false, employee: false },
    audit: { superAdmin: true, companyAdmin: false, manager: false, employee: false }
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    passwordExpiry: true,
    passwordComplexity: true,
    sessionTimeout: true
  });

  const [backup, setBackup] = useState({
    autoBackup: true,
    backupFrequency: 'daily'
  });

  const handleSecurityChange = (key) => {
    setSecurity(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleBackupChange = (key, value) => {
    setBackup(prev => ({
      ...prev,
      [key]: key === 'autoBackup' ? !prev[key] : value
    }));
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
      </div>
    
      <Tabs defaultValue="security" className="space-y-4">
        <TabsList className={cn("w-full md:w-auto", isMobile && "flex flex-wrap")}>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className={isMobile ? "text-xs" : ""}>Security</span>
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className={isMobile ? "text-xs" : ""}>Roles & Permissions</span>
          </TabsTrigger>
          <TabsTrigger value="backup" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className={isMobile ? "text-xs" : ""}>Backup & Recovery</span>
          </TabsTrigger>
          <TabsTrigger value="localization" className="flex items-center gap-2">
            <Languages className="h-4 w-4" />
            <span className={isMobile ? "text-xs" : ""}>Localization</span>
          </TabsTrigger>
          <TabsTrigger value="branding" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className={isMobile ? "text-xs" : ""}>Branding</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Cog className="h-4 w-4" />
            <span className={isMobile ? "text-xs" : ""}>Advanced</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security policies for the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for all administrative accounts
                    </p>
                  </div>
                  <Switch
                    id="two-factor"
                    checked={security.twoFactorAuth}
                    onCheckedChange={() => handleSecurityChange('twoFactorAuth')}
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="password-expiry">Password Expiry</Label>
                    <p className="text-sm text-muted-foreground">
                      Force password change every 90 days
                    </p>
                  </div>
                  <Switch
                    id="password-expiry"
                    checked={security.passwordExpiry}
                    onCheckedChange={() => handleSecurityChange('passwordExpiry')}
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="password-complexity">Password Complexity</Label>
                    <p className="text-sm text-muted-foreground">
                      Require strong passwords with special characters
                    </p>
                  </div>
                  <Switch
                    id="password-complexity"
                    checked={security.passwordComplexity}
                    onCheckedChange={() => handleSecurityChange('passwordComplexity')}
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="session-timeout">Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically log out after 30 minutes of inactivity
                    </p>
                  </div>
                  <Switch
                    id="session-timeout"
                    checked={security.sessionTimeout}
                    onCheckedChange={() => handleSecurityChange('sessionTimeout')}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-3">IP Access Control</h3>
                <div className="space-y-3">
                  <Input placeholder="Add IP address or range" />
                  <div className="flex justify-end">
                    <Button size="sm">Add IP</Button>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Current allowed IPs:</p>
                  <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded text-sm">
                    <p>192.168.1.0/24 (Office Network)</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <CardTitle>User Roles & Permissions</CardTitle>
                  <CardDescription>Manage user roles and their access permissions</CardDescription>
                </div>
                <Button>
                  Add New Role
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell className="font-medium">{role.name}</TableCell>
                        <TableCell>{role.users}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Permission Matrix</h3>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Module</TableHead>
                          <TableHead>Super Admin</TableHead>
                          <TableHead>Company Admin</TableHead>
                          <TableHead>Manager</TableHead>
                          <TableHead>Employee</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Dashboard</TableCell>
                          <TableCell><Checkbox checked={permissions.dashboard.superAdmin} /></TableCell>
                          <TableCell><Checkbox checked={permissions.dashboard.companyAdmin} /></TableCell>
                          <TableCell><Checkbox checked={permissions.dashboard.manager} /></TableCell>
                          <TableCell><Checkbox checked={permissions.dashboard.employee} /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Companies</TableCell>
                          <TableCell><Checkbox checked={permissions.companies.superAdmin} /></TableCell>
                          <TableCell><Checkbox checked={permissions.companies.companyAdmin} /></TableCell>
                          <TableCell><Checkbox checked={permissions.companies.manager} /></TableCell>
                          <TableCell><Checkbox checked={permissions.companies.employee} /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Employees</TableCell>
                          <TableCell><Checkbox checked={permissions.employees.superAdmin} /></TableCell>
                          <TableCell><Checkbox checked={permissions.employees.companyAdmin} /></TableCell>
                          <TableCell><Checkbox checked={permissions.employees.manager} /></TableCell>
                          <TableCell><Checkbox checked={permissions.employees.employee} /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Payroll</TableCell>
                          <TableCell><Checkbox checked={permissions.payroll.superAdmin} /></TableCell>
                          <TableCell><Checkbox checked={permissions.payroll.companyAdmin} /></TableCell>
                          <TableCell><Checkbox checked={permissions.payroll.manager} /></TableCell>
                          <TableCell><Checkbox checked={permissions.payroll.employee} /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Reports</TableCell>
                          <TableCell><Checkbox checked={permissions.reports.superAdmin} /></TableCell>
                          <TableCell><Checkbox checked={permissions.reports.companyAdmin} /></TableCell>
                          <TableCell><Checkbox checked={permissions.reports.manager} /></TableCell>
                          <TableCell><Checkbox checked={permissions.reports.employee} /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Settings</TableCell>
                          <TableCell><Checkbox checked={permissions.settings.superAdmin} /></TableCell>
                          <TableCell><Checkbox checked={permissions.settings.companyAdmin} /></TableCell>
                          <TableCell><Checkbox checked={permissions.settings.manager} /></TableCell>
                          <TableCell><Checkbox checked={permissions.settings.employee} /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Audit Logs</TableCell>
                          <TableCell><Checkbox checked={permissions.audit.superAdmin} /></TableCell>
                          <TableCell><Checkbox checked={permissions.audit.companyAdmin} /></TableCell>
                          <TableCell><Checkbox checked={permissions.audit.manager} /></TableCell>
                          <TableCell><Checkbox checked={permissions.audit.employee} /></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle>Backup & Recovery</CardTitle>
              <CardDescription>Configure automatic backups and restore options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-backup">Automatic Backups</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable scheduled automatic database backups
                  </p>
                </div>
                <Switch
                  id="auto-backup"
                  checked={backup.autoBackup}
                  onCheckedChange={() => handleBackupChange('autoBackup', null)}
                />
              </div>
              
              {backup.autoBackup && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                    <Select 
                      value={backup.backupFrequency}
                      onValueChange={(value) => handleBackupChange('backupFrequency', value)}
                    >
                      <SelectTrigger id="backup-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retention">Retention Period</Label>
                    <Select defaultValue="30">
                      <SelectTrigger id="retention">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-3">Manual Backup</h3>
                <Button className="flex gap-2">
                  <FileDown className="h-4 w-4" />
                  Create Backup Now
                </Button>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Recent Backups</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>2025-04-06 03:00 AM</TableCell>
                      <TableCell>245 MB</TableCell>
                      <TableCell>Automatic</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="mr-2">Download</Button>
                        <Button variant="outline" size="sm">Restore</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2025-04-05 03:00 AM</TableCell>
                      <TableCell>240 MB</TableCell>
                      <TableCell>Automatic</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="mr-2">Download</Button>
                        <Button variant="outline" size="sm">Restore</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="localization">
          <Card>
            <CardHeader>
              <CardTitle>Localization Settings</CardTitle>
              <CardDescription>Configure regional settings for the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currency" className="flex items-center gap-2">
                    <FileDown className="h-4 w-4" />
                    Default Currency
                  </Label>
                  <Select defaultValue="usd">
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD - US Dollar</SelectItem>
                      <SelectItem value="eur">EUR - Euro</SelectItem>
                      <SelectItem value="gbp">GBP - British Pound</SelectItem>
                      <SelectItem value="ghs">GHS - Ghanaian Cedi</SelectItem>
                      <SelectItem value="ngn">NGN - Nigerian Naira</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Default Time Zone
                  </Label>
                  <Select defaultValue="utc">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                      <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                      <SelectItem value="cst">CST (Central Standard Time)</SelectItem>
                      <SelectItem value="mst">MST (Mountain Standard Time)</SelectItem>
                      <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                      <SelectItem value="gmt">GMT (Greenwich Mean Time)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language" className="flex items-center gap-2">
                    <Languages className="h-4 w-4" />
                    System Language
                  </Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr" disabled>French (Coming soon)</SelectItem>
                      <SelectItem value="es" disabled>Spanish (Coming soon)</SelectItem>
                      <SelectItem value="de" disabled>German (Coming soon)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dateFormat" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date Format
                  </Label>
                  <Select defaultValue="dd-mm-yyyy">
                    <SelectTrigger id="dateFormat">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                      <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2">Time Format</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="format-12h" checked />
                  <Label htmlFor="format-12h">12-hour (1:30 PM)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="format-24h" />
                  <Label htmlFor="format-24h">24-hour (13:30)</Label>
                </div>
              </div>
              
              <div className="rounded-lg border p-4 bg-muted/20">
                <p className="text-sm text-muted-foreground">
                  These settings act as the global fallback defaults for newly added companies. Each company can override their own settings later.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle>Brand Customization</CardTitle>
              <CardDescription>Personalize the visual appearance of the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="systemName">System Name</Label>
                  <Input id="systemName" defaultValue="GreteRoll" />
                  <p className="text-xs text-muted-foreground">Appears on navbars, login screen</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline/Slogan</Label>
                  <Input id="tagline" defaultValue="Modern Payroll Management" />
                  <p className="text-xs text-muted-foreground">Displayed on login screen or footer</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Upload System Logo (Light Mode)</Label>
                  <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">SVG, PNG or JPG (max. 2MB)</p>
                    <Input id="logo-upload" type="file" className="hidden" />
                    <Button size="sm" variant="outline" onClick={() => document.getElementById('logo-upload')?.click()}>
                      Select File
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Upload System Logo (Dark Mode)</Label>
                  <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">SVG, PNG or JPG (max. 2MB)</p>
                    <Input id="dark-logo-upload" type="file" className="hidden" />
                    <Button size="sm" variant="outline" onClick={() => document.getElementById('dark-logo-upload')?.click()}>
                      Select File
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Primary Theme Color</Label>
                <div className="grid grid-cols-5 gap-2">
                  {['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#10B981'].map((color) => (
                    <button 
                      key={color}
                      className="h-10 rounded-md border-2 border-transparent hover:border-primary focus:outline-none focus:border-primary"
                      style={{ backgroundColor: color }}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
                <div className="pt-2">
                  <Label htmlFor="custom-color">Custom color:</Label>
                  <Input id="custom-color" type="color" defaultValue="#8B5CF6" className="w-full h-10" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>System Login Banner</Label>
                <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">SVG, PNG or JPG (max. 2MB)</p>
                  <Input id="banner-upload" type="file" className="hidden" />
                  <Button size="sm" variant="outline" onClick={() => document.getElementById('banner-upload')?.click()}>
                    Select File
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="mr-2">Reset to Default</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure additional system settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Enable Two-Factor Authentication</Label>
                  <Switch
                    checked={security.twoFactorAuth}
                    onCheckedChange={() => handleSecurityChange('twoFactorAuth')}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Enable Password Expiry</Label>
                  <Switch
                    checked={security.passwordExpiry}
                    onCheckedChange={() => handleSecurityChange('passwordExpiry')}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Enable Password Complexity</Label>
                  <Switch
                    checked={security.passwordComplexity}
                    onCheckedChange={() => handleSecurityChange('passwordComplexity')}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Enable Session Timeout</Label>
                  <Switch
                    checked={security.sessionTimeout}
                    onCheckedChange={() => handleSecurityChange('sessionTimeout')}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
