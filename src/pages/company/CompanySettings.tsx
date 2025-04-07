import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Bell, Shield, Users, Building, Palette } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const CompanySettings = () => {
  const [isSystemSettingsOpen, setIsSystemSettingsOpen] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Company Settings</h1>
        
        <Button onClick={() => setIsSystemSettingsOpen(true)}>
          Configure Branding
        </Button>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="w-full md:w-auto flex overflow-x-auto">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Users & Access</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="organization" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span>Organization</span>
          </TabsTrigger>
          <TabsTrigger value="branding" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span>Branding</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your company's general configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Configure your company's basic settings including name, address, contact information, and regional preferences.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="mr-2">Reset</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Users & Access</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Control who has access to your company's dashboard and what actions they can perform.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure system and email notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Set up email notifications for system events, payroll processing, and approval requests.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security policies</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Set password policies, two-factor authentication requirements, and session timeouts.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="organization">
          <Card>
            <CardHeader>
              <CardTitle>Organization Structure</CardTitle>
              <CardDescription>Configure your organizational structure</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Define company hierarchy, departmental structure and reporting relationships.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle>Company Branding</CardTitle>
              <CardDescription>Customize your company's branding and appearance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" placeholder="Enter company name" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyTagline">Company Tagline</Label>
                    <Input id="companyTagline" placeholder="Enter company tagline" />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label>Company Logo</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center">
                        <Building className="h-10 w-10 text-gray-400" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Drag and drop your company logo here, or click to browse
                      </p>
                      <Button variant="outline" size="sm">Upload Logo</Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {['#4F46E5', '#0EA5E9', '#10B981', '#F59E0B', '#EF4444'].map(color => (
                      <button
                        key={color}
                        className="h-10 rounded-md border-2 border-transparent hover:border-primary focus:outline-none focus:border-primary"
                        style={{ backgroundColor: color }}
                        aria-label={`Select color ${color}`}
                      />
                    ))}
                  </div>
                  <div className="pt-2">
                    <Label htmlFor="company-custom-color">Custom color:</Label>
                    <Input id="company-custom-color" type="color" defaultValue="#4F46E5" className="w-full h-10" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Email Template Header</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Upload a header image for your company email templates
                      </p>
                      <Button variant="outline" size="sm">Upload Header</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="mr-2">Reset</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* System Settings Dialog */}
      <SystemSettings 
        isAdmin={false} 
        isOpen={isSystemSettingsOpen} 
        onClose={() => setIsSystemSettingsOpen(false)} 
      />
    </div>
  );
};

export default CompanySettings;
