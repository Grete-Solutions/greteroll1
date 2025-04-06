
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Bell, Shield, Users, Building } from 'lucide-react';
import { SystemSettings } from '@/components/settings/SystemSettings';

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
