
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Save, UserRound, Mail, Phone, Lock, Bell } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate saving profile data
    setTimeout(() => {
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button type="submit" form="profile-form">
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="h-32 w-32">
              <AvatarImage src="/placeholder.svg" alt="Profile" />
              <AvatarFallback className="text-2xl bg-primary text-white">SA</AvatarFallback>
            </Avatar>
            <Button variant="outline" className="mt-4">Change Picture</Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="profile-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="flex">
                    <UserRound className="mr-2 h-4 w-4 mt-3 text-gray-500" />
                    <Input id="name" defaultValue="Super Admin" readOnly={!isEditing} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex">
                    <Mail className="mr-2 h-4 w-4 mt-3 text-gray-500" />
                    <Input id="email" defaultValue="admin@payrollnexus.com" readOnly={!isEditing} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex">
                    <Phone className="mr-2 h-4 w-4 mt-3 text-gray-500" />
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" readOnly={!isEditing} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue="Super Administrator" readOnly />
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="security">
              <TabsList>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="security" className="space-y-4 mt-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <h3 className="font-medium flex items-center"><Lock className="mr-2 h-4 w-4" /> Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">Add an additional layer of security</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="pt-2">
                  <Button variant="outline">Change Password</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-4 mt-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <h3 className="font-medium flex items-center"><Bell className="mr-2 h-4 w-4" /> Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive alerts via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <h3 className="font-medium">SMS Notifications</h3>
                    <p className="text-sm text-gray-500">Receive alerts via SMS</p>
                  </div>
                  <Switch />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminProfile;
