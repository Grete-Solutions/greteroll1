
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
import { FileDown, Database, Shield, Cog, Languages } from 'lucide-react';

const SystemSettings = () => {
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

  const togglePermission = (module: keyof typeof permissions, role: keyof (typeof permissions)[keyof typeof permissions]) => {
    setPermissions(prev => ({
      ...prev,
      [module]: {
        ...prev[module],
        [role]: !prev[module][role]
      }
    }));
  };

  const toggleSecurity = (setting: keyof typeof security) => {
    setSecurity(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>Configure global system settings and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="roles">
            <TabsList className="mb-6">
              <TabsTrigger value="roles">Role Management</TabsTrigger>
              <TabsTrigger value="security">Security Settings</TabsTrigger>
              <TabsTrigger value="backup">Backup Settings</TabsTrigger>
              <TabsTrigger value="language">System Language</TabsTrigger>
            </TabsList>

            <TabsContent value="roles">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-3">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">System Roles</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Role</TableHead>
                          <TableHead>Users</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {roles.map((role) => (
                          <TableRow key={role.id}>
                            <TableCell>{role.name}</TableCell>
                            <TableCell>{role.users}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Button variant="outline" size="sm">
                      Add New Role
                    </Button>
                  </div>
                </div>

                <div className="md:col-span-9">
                  <h3 className="text-lg font-medium mb-4">Permission Matrix</h3>
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
                        <TableCell>Dashboard</TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={permissions.dashboard.superAdmin} 
                            onCheckedChange={() => togglePermission('dashboard', 'superAdmin')}
                            disabled
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={permissions.dashboard.companyAdmin} 
                            onCheckedChange={() => togglePermission('dashboard', 'companyAdmin')}
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={permissions.dashboard.manager} 
                            onCheckedChange={() => togglePermission('dashboard', 'manager')}
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={permissions.dashboard.employee} 
                            onCheckedChange={() => togglePermission('dashboard', 'employee')}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Companies Management</TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={permissions.companies.superAdmin} 
                            onCheckedChange={() => togglePermission('companies', 'superAdmin')}
                            disabled
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={permissions.companies.companyAdmin} 
                            onCheckedChange={() => togglePermission('companies', 'companyAdmin')}
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={permissions.companies.manager} 
                            onCheckedChange={() => togglePermission('companies', 'manager')}
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={permissions.companies.employee} 
                            onCheckedChange={() => togglePermission('companies', 'employee')}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Employee Management</TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={permissions.employees.superAdmin} 
                            onCheckedChange={() => togglePermission('employees', 'superAdmin')}
                            disabled
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={permissions.employees.companyAdmin} 
                            onCheckedChange={() => togglePermission('employees', 'companyAdmin')}
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={permissions.employees.manager} 
                            onCheckedChange={() => togglePermission('employees', 'manager')}
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={permissions.employees.employee} 
                            onCheckedChange={() => togglePermission('employees', 'employee')}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Payroll Configuration</TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={permissions.payroll.superAdmin} 
                            onCheckedChange={() => togglePermission('payroll', 'superAdmin')}
                            disabled
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={permissions.payroll.companyAdmin} 
                            onCheckedChange={() => togglePermission('payroll', 'companyAdmin')}
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={permissions.payroll.manager} 
                            onCheckedChange={() => togglePermission('payroll', 'manager')}
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={permissions.payroll.employee} 
                            onCheckedChange={() => togglePermission('payroll', 'employee')}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Reports</TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={permissions.reports.superAdmin} 
                            onCheckedChange={() => togglePermission('reports', 'superAdmin')}
                            disabled
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={permissions.reports.companyAdmin} 
                            onCheckedChange={() => togglePermission('reports', 'companyAdmin')}
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={permissions.reports.manager} 
                            onCheckedChange={() => togglePermission('reports', 'manager')}
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={permissions.reports.employee} 
                            onCheckedChange={() => togglePermission('reports', 'employee')}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>System Settings</TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={permissions.settings.superAdmin} 
                            onCheckedChange={() => togglePermission('settings', 'superAdmin')}
                            disabled
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={permissions.settings.companyAdmin} 
                            onCheckedChange={() => togglePermission('settings', 'companyAdmin')}
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={permissions.settings.manager} 
                            onCheckedChange={() => togglePermission('settings', 'manager')}
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={permissions.settings.employee} 
                            onCheckedChange={() => togglePermission('settings', 'employee')}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Audit Logs</TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={permissions.audit.superAdmin} 
                            onCheckedChange={() => togglePermission('audit', 'superAdmin')}
                            disabled
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={permissions.audit.companyAdmin} 
                            onCheckedChange={() => togglePermission('audit', 'companyAdmin')}
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={permissions.audit.manager} 
                            onCheckedChange={() => togglePermission('audit', 'manager')}
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={permissions.audit.employee} 
                            onCheckedChange={() => togglePermission('audit', 'employee')}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    <Shield className="inline-block mr-2 h-5 w-5" />
                    Security Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
                      </div>
                      <Switch 
                        checked={security.twoFactorAuth}
                        onCheckedChange={() => toggleSecurity('twoFactorAuth')}
                      />
                    </div>
                    <div className="flex justify-between items-center py-3 border-b">
                      <div>
                        <p className="font-medium">Password Expiry</p>
                        <p className="text-sm text-gray-500">Passwords expire after 90 days</p>
                      </div>
                      <Switch 
                        checked={security.passwordExpiry}
                        onCheckedChange={() => toggleSecurity('passwordExpiry')}
                      />
                    </div>
                    <div className="flex justify-between items-center py-3 border-b">
                      <div>
                        <p className="font-medium">Password Complexity</p>
                        <p className="text-sm text-gray-500">Require strong passwords (8+ chars, special chars)</p>
                      </div>
                      <Switch 
                        checked={security.passwordComplexity}
                        onCheckedChange={() => toggleSecurity('passwordComplexity')}
                      />
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <div>
                        <p className="font-medium">Session Timeout</p>
                        <p className="text-sm text-gray-500">Logout after 30 minutes of inactivity</p>
                      </div>
                      <Switch 
                        checked={security.sessionTimeout}
                        onCheckedChange={() => toggleSecurity('sessionTimeout')}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Failed Login Attempts</label>
                    <Input defaultValue="5" type="number" />
                    <p className="text-xs text-gray-500 mt-1">Number of failed attempts before account lockout</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Session Timeout (minutes)</label>
                    <Input defaultValue="30" type="number" />
                    <p className="text-xs text-gray-500 mt-1">Automatically log users out after inactivity</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="backup">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    <Database className="inline-block mr-2 h-5 w-5" />
                    Backup Settings
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b">
                      <div>
                        <p className="font-medium">Automatic Backup</p>
                        <p className="text-sm text-gray-500">Schedule regular system backups</p>
                      </div>
                      <Switch 
                        checked={backup.autoBackup}
                        onCheckedChange={(checked) => 
                          setBackup(prev => ({ ...prev, autoBackup: checked }))}
                      />
                    </div>
                    
                    {backup.autoBackup && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-4 mt-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Backup Frequency</label>
                          <Select 
                            value={backup.backupFrequency}
                            onValueChange={(value) => 
                              setBackup(prev => ({ ...prev, backupFrequency: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Time</label>
                          <Input type="time" defaultValue="02:00" />
                          <p className="text-xs text-gray-500 mt-1">Recommended during off-hours</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-6">
                      <h4 className="font-medium mb-2">Backup Storage</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="cloud-storage" defaultChecked />
                          <Label htmlFor="cloud-storage">Cloud Storage</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="local-server" />
                          <Label htmlFor="local-server">Local Server</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button variant="outline" className="mr-2">
                        <Database className="h-4 w-4 mr-2" />
                        Manual Backup
                      </Button>
                      <Button variant="outline">
                        <FileDown className="h-4 w-4 mr-2" />
                        Download Latest Backup
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="language">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    <Languages className="inline-block mr-2 h-5 w-5" />
                    System Language
                  </h3>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center p-6">
                        <Languages className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-lg font-medium mb-2">English (United States)</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          The system is currently fixed to English language.
                          Additional language support will be available in future updates.
                        </p>
                        <Button variant="outline" disabled>
                          Change Language
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>Save Settings</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SystemSettings;
