
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,  
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Palette, Globe, Image, Building } from "lucide-react";

interface SystemSettingsProps {
  isAdmin?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export function SystemSettings({ isAdmin = false, isOpen, onClose }: SystemSettingsProps) {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    systemName: "GreteRoll",
    logo: "/logo.png",
    primaryColor: "#4f46e5",
    accentColor: "#4338ca",
    companyName: isAdmin ? "" : "Acme Inc.",
  });

  const handleChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // In a real application, this would save to a database or backend
    toast({
      title: "Settings saved",
      description: "Your system settings have been updated successfully.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isAdmin ? "System Settings" : "Company Settings"}
          </DialogTitle>
          <DialogDescription>
            Customize your {isAdmin ? "system" : "company"} appearance and branding.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="branding">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="branding" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span>Branding</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span>Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="localization" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Localization</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="branding" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="systemName">
                  {isAdmin ? "System Name" : "Company Name"}
                </Label>
                <Input
                  id="systemName"
                  value={isAdmin ? settings.systemName : settings.companyName}
                  onChange={(e) => handleChange(isAdmin ? 'systemName' : 'companyName', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="logo">Logo URL</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="logo"
                    value={settings.logo}
                    onChange={(e) => handleChange('logo', e.target.value)}
                  />
                  <Button variant="outline" size="icon">
                    <Image className="h-4 w-4" />
                  </Button>
                </div>
                {settings.logo && (
                  <div className="mt-2 flex justify-center p-4 border rounded-md">
                    <img 
                      src={settings.logo} 
                      alt="Logo preview" 
                      className="max-h-24 object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/200x100?text=Logo+Preview";
                      }} 
                    />
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="primaryColor"
                    value={settings.primaryColor}
                    onChange={(e) => handleChange('primaryColor', e.target.value)}
                  />
                  <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: settings.primaryColor }} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="accentColor">Accent Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="accentColor"
                    value={settings.accentColor}
                    onChange={(e) => handleChange('accentColor', e.target.value)}
                  />
                  <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: settings.accentColor }} />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Theme Preview</Label>
              <Card>
                <CardHeader style={{ backgroundColor: settings.primaryColor, color: '#fff' }}>
                  <CardTitle>Header with Primary Color</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-4">
                  <p>Regular content area</p>
                  <Button style={{ backgroundColor: settings.primaryColor }}>
                    Primary Button
                  </Button>
                  <Button variant="outline" style={{ borderColor: settings.accentColor, color: settings.accentColor }}>
                    Accent Button
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="localization" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="language">Default Language</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dateFormat">Date Format</Label>
              <Select defaultValue="MM/DD/YYYY">
                <SelectTrigger>
                  <SelectValue placeholder="Select date format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timeZone">Time Zone</Label>
              <Select defaultValue="UTC">
                <SelectTrigger>
                  <SelectValue placeholder="Select time zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="EST">Eastern Standard Time (EST)</SelectItem>
                  <SelectItem value="CST">Central Standard Time (CST)</SelectItem>
                  <SelectItem value="PST">Pacific Standard Time (PST)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
