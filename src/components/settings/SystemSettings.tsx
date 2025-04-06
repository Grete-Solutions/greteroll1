
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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { 
  Palette, 
  Globe, 
  Image, 
  Building, 
  Clock,
  Languages,
  Calendar,
  Settings,
  Shield,
  Upload,
  BellRing,
  ExternalLink,
  Beaker
} from "lucide-react";

interface SystemSettingsProps {
  isAdmin?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export function SystemSettings({ isAdmin = false, isOpen, onClose }: SystemSettingsProps) {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // Branding settings
    systemName: "GreteRoll",
    logo: "/logo.png",
    darkModeLogo: "",
    primaryColor: "#4f46e5",
    accentColor: "#4338ca",
    companyName: isAdmin ? "" : "Acme Inc.",
    loginBanner: "",
    tagline: "Modern payroll solution for modern businesses",
    
    // Localization settings
    defaultCurrency: "USD",
    timezone: "UTC",
    language: "English",
    dateFormat: "DD-MM-YYYY",
    timeFormat: "24-hour",
    
    // Advanced settings
    twoFactorAuth: false,
    passwordComplexity: true,
    sessionTimeout: "30min",
    autoBackup: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: false,
    smsApiKey: "",
    emailApiKey: "",
    analyticsApiKey: "",
    betaFeatures: false
  });

  const handleChange = (field: string, value: string | boolean) => {
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

  const currencies = [
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "GHS", name: "Ghanaian Cedi" },
    { code: "NGN", name: "Nigerian Naira" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "INR", name: "Indian Rupee" },
    { code: "CNY", name: "Chinese Yuan" }
  ];

  const timezones = [
    "UTC",
    "GMT",
    "EST (UTC-5)",
    "CST (UTC-6)",
    "MST (UTC-7)",
    "PST (UTC-8)",
    "IST (UTC+5:30)",
    "JST (UTC+9)",
    "AEST (UTC+10)",
    "CET (UTC+1)"
  ];

  const languages = ["English", "French", "Spanish", "German", "Portuguese", "Arabic", "Chinese", "Japanese"];
  
  const dateFormats = ["DD-MM-YYYY", "MM-DD-YYYY", "YYYY-MM-DD"];
  
  const timeFormats = ["12-hour", "24-hour"];
  
  const sessionTimeouts = ["15min", "30min", "1hr", "2hr", "4hr"];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isAdmin ? "System Settings" : "Company Settings"}
          </DialogTitle>
          <DialogDescription>
            Customize your {isAdmin ? "system" : "company"} appearance and behavior.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="branding">
          <TabsList className="grid w-full grid-cols-5">
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
            <TabsTrigger value="brandCustomization" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              <span>UI Personalization</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Advanced</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Original Branding Tab */}
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
          
          {/* Original Appearance Tab */}
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
          
          {/* Original Localization Tab */}
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

          {/* NEW: Localization Settings Tab */}
          <TabsContent value="localization" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="defaultCurrency" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Default Currency
                </Label>
                <Select 
                  value={settings.defaultCurrency}
                  onValueChange={(value) => handleChange('defaultCurrency', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  This will be the default currency for all new companies
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timezone" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Default Time Zone
                </Label>
                <Select 
                  value={settings.timezone}
                  onValueChange={(value) => handleChange('timezone', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {timezones.map((tz) => (
                      <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language" className="flex items-center gap-2">
                  <Languages className="h-4 w-4" />
                  System Language
                </Label>
                <Select 
                  value={settings.language}
                  onValueChange={(value) => handleChange('language', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 opacity-60">
                <Label htmlFor="dateFormat" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date Format
                </Label>
                <Select 
                  value={settings.dateFormat} 
                  onValueChange={(value) => handleChange('dateFormat', value)}
                  disabled
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    {dateFormats.map((format) => (
                      <SelectItem key={format} value={format}>{format}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground italic mt-1">Coming soon</p>
              </div>
              
              <div className="space-y-2 opacity-60">
                <Label htmlFor="timeFormat" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Time Format
                </Label>
                <Select 
                  value={settings.timeFormat}
                  onValueChange={(value) => handleChange('timeFormat', value)}
                  disabled
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time format" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeFormats.map((format) => (
                      <SelectItem key={format} value={format}>{format}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground italic mt-1">Coming soon</p>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md text-sm">
                <div className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-blue-700 dark:text-blue-300">
                    These settings act as the global fallback defaults for newly added companies. Each company can override their own localization settings later.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* NEW: Brand Customization Tab */}
          <TabsContent value="brandCustomization" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="brandSystemName" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  System Name
                </Label>
                <Input
                  id="brandSystemName"
                  value={settings.systemName}
                  onChange={(e) => handleChange('systemName', e.target.value)}
                  placeholder="Enter system name that appears on navbars, login screen"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This name will appear throughout the application interface
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryLogo" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Primary Logo (Light Mode)
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="primaryLogo"
                      value={settings.logo}
                      onChange={(e) => handleChange('logo', e.target.value)}
                      placeholder="Logo URL or upload"
                    />
                    <Button variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                  {settings.logo && (
                    <div className="mt-2 flex justify-center p-2 border rounded-md bg-white">
                      <img 
                        src={settings.logo} 
                        alt="Primary logo preview" 
                        className="max-h-20 object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/200x100?text=Logo+Preview";
                        }} 
                      />
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="darkModeLogo" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Dark Mode Logo (Optional)
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="darkModeLogo"
                      value={settings.darkModeLogo}
                      onChange={(e) => handleChange('darkModeLogo', e.target.value)}
                      placeholder="Dark mode logo URL or upload"
                    />
                    <Button variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                  {settings.darkModeLogo && (
                    <div className="mt-2 flex justify-center p-2 border rounded-md bg-gray-800">
                      <img 
                        src={settings.darkModeLogo} 
                        alt="Dark mode logo preview" 
                        className="max-h-20 object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/200x100?text=Logo+Preview";
                        }} 
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="primaryColor" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Primary Theme Color
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => handleChange('primaryColor', e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    value={settings.primaryColor}
                    onChange={(e) => handleChange('primaryColor', e.target.value)}
                    className="flex-1"
                  />
                </div>
                <div className="flex mt-2 gap-2">
                  {['#4f46e5', '#10b981', '#f97316', '#8b5cf6', '#ec4899'].map(color => (
                    <div 
                      key={color} 
                      onClick={() => handleChange('primaryColor', color)}
                      className="w-8 h-8 rounded-full cursor-pointer border hover:scale-110 transition-transform" 
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="loginBanner" className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  System Login Banner (Optional)
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="loginBanner"
                    value={settings.loginBanner}
                    onChange={(e) => handleChange('loginBanner', e.target.value)}
                    placeholder="Banner image URL or upload"
                  />
                  <Button variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                {settings.loginBanner && (
                  <div className="mt-2 flex justify-center p-2 border rounded-md">
                    <img 
                      src={settings.loginBanner} 
                      alt="Login banner preview" 
                      className="max-h-32 w-full object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/800x200?text=Login+Banner+Preview";
                      }} 
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tagline" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Tagline/Slogan
                </Label>
                <Input
                  id="tagline"
                  value={settings.tagline}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  placeholder="Enter your system's tagline or slogan"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This will be displayed on the login screen or in the footer
                </p>
              </div>
              
              <div className="flex items-center justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => {}}>
                  Reset to Default
                </Button>
              </div>
            </div>
          </TabsContent>
          
          {/* NEW: Advanced System Options Tab */}
          <TabsContent value="advanced" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Two-Factor Authentication
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Require 2FA for all super admin accounts
                  </p>
                </div>
                <Switch 
                  checked={settings.twoFactorAuth} 
                  onCheckedChange={(checked) => handleChange('twoFactorAuth', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Enforce Password Complexity
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Require strong passwords (min 8 chars, symbols, numbers)
                  </p>
                </div>
                <Switch 
                  checked={settings.passwordComplexity} 
                  onCheckedChange={(checked) => handleChange('passwordComplexity', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Session Timeout Duration
                </Label>
                <Select 
                  value={settings.sessionTimeout}
                  onValueChange={(value) => handleChange('sessionTimeout', value)}
                >
                  <SelectTrigger id="sessionTimeout">
                    <SelectValue placeholder="Select timeout duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessionTimeouts.map((timeout) => (
                      <SelectItem key={timeout} value={timeout}>{timeout}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Users will be logged out after this period of inactivity
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Enable System-Wide Auto Backup
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically backup system data on schedule
                  </p>
                </div>
                <Switch 
                  checked={settings.autoBackup} 
                  onCheckedChange={(checked) => handleChange('autoBackup', checked)}
                />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <BellRing className="h-4 w-4" />
                  Global Notification Defaults
                </h3>
                <div className="space-y-3 pl-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailNotifications">Email notifications</Label>
                    <Switch 
                      id="emailNotifications" 
                      checked={settings.emailNotifications} 
                      onCheckedChange={(checked) => handleChange('emailNotifications', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="smsNotifications">SMS notifications</Label>
                    <Switch 
                      id="smsNotifications" 
                      checked={settings.smsNotifications} 
                      onCheckedChange={(checked) => handleChange('smsNotifications', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pushNotifications">Push notifications</Label>
                    <Switch 
                      id="pushNotifications" 
                      checked={settings.pushNotifications} 
                      onCheckedChange={(checked) => handleChange('pushNotifications', checked)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Third-Party Integration Keys
                </h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="smsApiKey">SMS Gateway API Key</Label>
                    <Input
                      id="smsApiKey"
                      type="password"
                      value={settings.smsApiKey}
                      onChange={(e) => handleChange('smsApiKey', e.target.value)}
                      placeholder="Enter SMS gateway API key"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emailApiKey">Email Provider API Key</Label>
                    <Input
                      id="emailApiKey"
                      type="password"
                      value={settings.emailApiKey}
                      onChange={(e) => handleChange('emailApiKey', e.target.value)}
                      placeholder="Enter email provider API key"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="analyticsApiKey">Analytics API Key</Label>
                    <Input
                      id="analyticsApiKey"
                      type="password"
                      value={settings.analyticsApiKey}
                      onChange={(e) => handleChange('analyticsApiKey', e.target.value)}
                      placeholder="Enter analytics API key"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Beaker className="h-4 w-4" />
                    Beta Feature Toggle
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Enable experimental features for testing
                  </p>
                </div>
                <Switch 
                  checked={settings.betaFeatures} 
                  onCheckedChange={(checked) => handleChange('betaFeatures', checked)}
                />
              </div>
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
