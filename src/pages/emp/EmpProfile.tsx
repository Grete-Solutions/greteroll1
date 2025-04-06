
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Save, UserRound, Mail, Phone, Building, Calendar, CreditCard } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const EmpProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate submitting profile update request
    setTimeout(() => {
      setIsEditing(false);
      toast({
        title: "Profile update requested",
        description: "Your profile update has been sent to HR for approval.",
      });
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Request Profile Update</Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button type="submit" form="profile-form">
              <Save className="mr-2 h-4 w-4" /> Submit Request
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
              <AvatarFallback className="text-2xl bg-primary text-white">JD</AvatarFallback>
            </Avatar>
            <Button variant="outline" className="mt-4" disabled={!isEditing}>Change Picture</Button>
            
            <div className="mt-6 w-full">
              <p className="text-sm font-medium text-center mb-2">Employee Info</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Employee ID</span>
                  <span className="font-medium">EMP001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Department</span>
                  <span className="font-medium">Engineering</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Manager</span>
                  <span className="font-medium">Sarah Johnson</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>View and edit your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="profile-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="flex">
                    <UserRound className="mr-2 h-4 w-4 mt-3 text-gray-500" />
                    <Input id="name" defaultValue="John Doe" readOnly />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex">
                    <Mail className="mr-2 h-4 w-4 mt-3 text-gray-500" />
                    <Input id="email" defaultValue="john.doe@company.com" readOnly />
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
                  <Label htmlFor="dob">Date of Birth</Label>
                  <div className="flex">
                    <Calendar className="mr-2 h-4 w-4 mt-3 text-gray-500" />
                    <Input id="dob" defaultValue="1985-06-15" readOnly />
                  </div>
                </div>
              </div>

              <Separator className="my-4" />
              
              <h3 className="text-md font-medium">Address Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address Line 1</Label>
                  <Input id="address" defaultValue="123 Main Street" readOnly={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address2">Address Line 2</Label>
                  <Input id="address2" defaultValue="Apt 4B" readOnly={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="San Francisco" readOnly={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" defaultValue="California" readOnly={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">Zip Code</Label>
                  <Input id="zip" defaultValue="94107" readOnly={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" defaultValue="United States" readOnly={!isEditing} />
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Work & Financial Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="work">
              <TabsList>
                <TabsTrigger value="work">Work Information</TabsTrigger>
                <TabsTrigger value="bank">Banking Details</TabsTrigger>
                <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
              </TabsList>
              
              <TabsContent value="work" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <div className="p-2 border rounded-md bg-muted/50">
                      Senior Software Engineer
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <div className="p-2 border rounded-md bg-muted/50">
                      <div className="flex">
                        <Building className="mr-2 h-4 w-4 text-gray-500" />
                        Engineering
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Join Date</Label>
                    <div className="p-2 border rounded-md bg-muted/50">
                      <div className="flex">
                        <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                        June 15, 2020
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="bank" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bank">Bank Name</Label>
                    <Input id="bank" defaultValue="National Bank" readOnly={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountName">Account Holder Name</Label>
                    <Input id="accountName" defaultValue="John Doe" readOnly={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <div className="flex">
                      <CreditCard className="mr-2 h-4 w-4 mt-3 text-gray-500" />
                      <Input id="accountNumber" defaultValue="XXXX-XXXX-XXXX-1234" readOnly={!isEditing} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="routingNumber">Routing Number</Label>
                    <Input id="routingNumber" defaultValue="XXX-XXX-XXX" readOnly={!isEditing} />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="emergency" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyName">Contact Name</Label>
                    <Input id="emergencyName" defaultValue="Jane Doe" readOnly={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="relationship">Relationship</Label>
                    <Input id="relationship" defaultValue="Spouse" readOnly={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Phone Number</Label>
                    <div className="flex">
                      <Phone className="mr-2 h-4 w-4 mt-3 text-gray-500" />
                      <Input id="emergencyPhone" defaultValue="+1 (555) 987-6543" readOnly={!isEditing} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyEmail">Email Address</Label>
                    <div className="flex">
                      <Mail className="mr-2 h-4 w-4 mt-3 text-gray-500" />
                      <Input id="emergencyEmail" defaultValue="jane.doe@email.com" readOnly={!isEditing} />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmpProfile;
