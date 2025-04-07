
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Check, Info, Mail, Shield, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SystemSettings from '@/pages/SystemSettings';

const CompanySettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // General Settings State
  const [companyName, setCompanyName] = useState('Acme Corporation');
  const [companyEmail, setCompanyEmail] = useState('admin@acmecorp.com');
  const [fiscalYearStart, setFiscalYearStart] = useState('January');
  const [timezone, setTimezone] = useState('UTC-05:00 (Eastern Time)');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  
  // Security Settings State
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [passwordExpiryDays, setPasswordExpiryDays] = useState('90');
  const [minPasswordLength, setMinPasswordLength] = useState('8');
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [loginAttemptsAllowed, setLoginAttemptsAllowed] = useState('5');
  
  // Email Settings State
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
  const [weeklyReportsEnabled, setWeeklyReportsEnabled] = useState(true);
  const [leaveApprovalEmails, setLeaveApprovalEmails] = useState(true);
  const [payrollProcessingEmails, setPayrollProcessingEmails] = useState(true);
  const [newEmployeeEmails, setNewEmployeeEmails] = useState(true);
  
  // Integrations State
  const [quickbooksEnabled, setQuickbooksEnabled] = useState(true);
  const [slackEnabled, setSlackEnabled] = useState(false);
  const [googleWorkspaceEnabled, setGoogleWorkspaceEnabled] = useState(true);
  const [microsoftEnabled, setMicrosoftEnabled] = useState(false);
  
  const handleSaveGeneral = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Settings saved",
        description: "Your general settings have been updated successfully.",
      });
    }, 1000);
  };
  
  const handleSaveSecurity = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Security settings saved",
        description: "Your security settings have been updated successfully.",
      });
    }, 1000);
  };
  
  const handleSaveEmail = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Email preferences saved",
        description: "Your email notification settings have been updated successfully.",
      });
    }, 1000);
  };
  
  const handleSaveIntegrations = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Integration settings saved",
        description: "Your integration settings have been updated successfully.",
      });
    }, 1000);
  };
  
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Company Settings</h1>
        <p className="text-muted-foreground">Manage your company settings and preferences</p>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="email">Email Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your company's general information and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input 
                    id="company-name" 
                    value={companyName} 
                    onChange={(e) => setCompanyName(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">Company Email</Label>
                  <Input 
                    id="company-email" 
                    type="email" 
                    value={companyEmail} 
                    onChange={(e) => setCompanyEmail(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fiscal-year">Fiscal Year Start</Label>
                  <select
                    id="fiscal-year"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={fiscalYearStart}
                    onChange={(e) => setFiscalYearStart(e.target.value)}
                  >
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Default Timezone</Label>
                  <select
                    id="timezone"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                  >
                    <option value="UTC-12:00">UTC-12:00</option>
                    <option value="UTC-11:00">UTC-11:00</option>
                    <option value="UTC-10:00">UTC-10:00 (Hawaii)</option>
                    <option value="UTC-09:00">UTC-09:00 (Alaska)</option>
                    <option value="UTC-08:00">UTC-08:00 (Pacific Time)</option>
                    <option value="UTC-07:00">UTC-07:00 (Mountain Time)</option>
                    <option value="UTC-06:00">UTC-06:00 (Central Time)</option>
                    <option value="UTC-05:00">UTC-05:00 (Eastern Time)</option>
                    <option value="UTC-04:00">UTC-04:00 (Atlantic Time)</option>
                    <option value="UTC-03:00">UTC-03:00</option>
                    <option value="UTC-02:00">UTC-02:00</option>
                    <option value="UTC-01:00">UTC-01:00</option>
                    <option value="UTC+00:00">UTC+00:00 (GMT)</option>
                    <option value="UTC+01:00">UTC+01:00 (Central European Time)</option>
                    <option value="UTC+02:00">UTC+02:00 (Eastern European Time)</option>
                    <option value="UTC+03:00">UTC+03:00</option>
                    <option value="UTC+04:00">UTC+04:00</option>
                    <option value="UTC+05:00">UTC+05:00</option>
                    <option value="UTC+05:30">UTC+05:30 (India)</option>
                    <option value="UTC+06:00">UTC+06:00</option>
                    <option value="UTC+07:00">UTC+07:00</option>
                    <option value="UTC+08:00">UTC+08:00 (China)</option>
                    <option value="UTC+09:00">UTC+09:00 (Japan)</option>
                    <option value="UTC+10:00">UTC+10:00</option>
                    <option value="UTC+11:00">UTC+11:00</option>
                    <option value="UTC+12:00">UTC+12:00</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <select
                    id="date-format"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    <option value="YYYY/MM/DD">YYYY/MM/DD</option>
                    <option value="DD-MMM-YYYY">DD-MMM-YYYY</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveGeneral} disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" /> Security Settings
              </CardTitle>
              <CardDescription>
                Configure security settings for your company account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="mfa">Multi-Factor Authentication (MFA)</Label>
                    <p className="text-xs text-muted-foreground">
                      Require all users to use two-factor authentication
                    </p>
                  </div>
                  <Switch
                    id="mfa"
                    checked={mfaEnabled}
                    onCheckedChange={setMfaEnabled}
                  />
                </div>
                
                <Separator />
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                    <Input 
                      id="password-expiry" 
                      type="number" 
                      value={passwordExpiryDays} 
                      onChange={(e) => setPasswordExpiryDays(e.target.value)} 
                    />
                    <p className="text-xs text-muted-foreground">
                      Set to 0 for no expiration
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="min-password-length">Minimum Password Length</Label>
                    <Input 
                      id="min-password-length" 
                      type="number" 
                      value={minPasswordLength} 
                      onChange={(e) => setMinPasswordLength(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input 
                      id="session-timeout" 
                      type="number" 
                      value={sessionTimeout} 
                      onChange={(e) => setSessionTimeout(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-attempts">Login Attempts Before Lockout</Label>
                    <Input 
                      id="login-attempts" 
                      type="number" 
                      value={loginAttemptsAllowed} 
                      onChange={(e) => setLoginAttemptsAllowed(e.target.value)} 
                    />
                  </div>
                </div>
                
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 text-amber-700 mt-4">
                  <div className="flex">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    <div>
                      <p className="font-medium">Security Best Practices</p>
                      <p className="text-sm mt-1">
                        We recommend setting password expiry to no more than 90 days and requiring a minimum password length of 8 characters.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveSecurity} disabled={loading}>
                  {loading ? 'Saving...' : 'Save Security Settings'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" /> Email Notifications
              </CardTitle>
              <CardDescription>
                Configure which email notifications your company will receive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Enable or disable all email notifications
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotificationsEnabled}
                    onCheckedChange={setEmailNotificationsEnabled}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <p className="text-sm font-medium">Notification Preferences</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weekly-reports">Weekly Summary Reports</Label>
                      <p className="text-xs text-muted-foreground">
                        Receive weekly analytics and summary reports
                      </p>
                    </div>
                    <Switch
                      id="weekly-reports"
                      disabled={!emailNotificationsEnabled}
                      checked={weeklyReportsEnabled && emailNotificationsEnabled}
                      onCheckedChange={setWeeklyReportsEnabled}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="leave-approval">Leave Approval Notifications</Label>
                      <p className="text-xs text-muted-foreground">
                        Notifications about leave requests and approvals
                      </p>
                    </div>
                    <Switch
                      id="leave-approval"
                      disabled={!emailNotificationsEnabled}
                      checked={leaveApprovalEmails && emailNotificationsEnabled}
                      onCheckedChange={setLeaveApprovalEmails}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="payroll-processing">Payroll Processing</Label>
                      <p className="text-xs text-muted-foreground">
                        Updates about payroll processing and completion
                      </p>
                    </div>
                    <Switch
                      id="payroll-processing"
                      disabled={!emailNotificationsEnabled}
                      checked={payrollProcessingEmails && emailNotificationsEnabled}
                      onCheckedChange={setPayrollProcessingEmails}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="new-employee">New Employee Onboarding</Label>
                      <p className="text-xs text-muted-foreground">
                        Notifications when new employees are added
                      </p>
                    </div>
                    <Switch
                      id="new-employee"
                      disabled={!emailNotificationsEnabled}
                      checked={newEmployeeEmails && emailNotificationsEnabled}
                      onCheckedChange={setNewEmployeeEmails}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveEmail} disabled={loading}>
                  {loading ? 'Saving...' : 'Save Email Preferences'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>
                Connect with other services your company uses.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 12V6H4V18H14" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M16 8H8V10H16V8Z" fill="#1D4ED8"/>
                          <path d="M16 16C16 14.8954 16.8954 14 18 14C19.1046 14 20 14.8954 20 16C20 17.1046 19.1046 18 18 18C16.8954 18 16 17.1046 16 16Z" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M22 16H20" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M16 16H14" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">QuickBooks Integration</p>
                        <p className="text-sm text-muted-foreground">Sync your payroll data with QuickBooks</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {quickbooksEnabled && <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Connected</Badge>}
                      <Switch
                        checked={quickbooksEnabled}
                        onCheckedChange={setQuickbooksEnabled}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-md bg-purple-100 flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 16L5 8" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M19 16L19 8" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M5 16C5 18.2091 6.79086 20 9 20H15C17.2091 20 19 18.2091 19 16" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M5 8C5 5.79086 6.79086 4 9 4L15 4C17.2091 4 19 5.79086 19 8" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Slack Integration</p>
                        <p className="text-sm text-muted-foreground">Send notifications to your Slack workspace</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {slackEnabled && <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Connected</Badge>}
                      <Switch
                        checked={slackEnabled}
                        onCheckedChange={setSlackEnabled}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.5455 9.92543C15.9195 9.26103 16.2313 8.66151 16.4236 8.18207C16.6159 7.70264 16.7302 7.16797 16.7302 6.67164C16.7302 6.25628 16.6761 5.86567 16.532 5.52212C16.3878 5.17857 16.1617 4.90233 15.8823 4.68237C15.6029 4.4624 15.2381 4.29499 14.8462 4.19453C14.4544 4.09407 13.9993 4.04008 13.5398 4.0401C13.0263 4.0401 12.5264 4.07285 12.0943 4.14412C11.6622 4.21539 11.2301 4.30494 10.7979 4.43537C10.4778 4.53583 10.1847 4.63629 9.9458 4.74249C9.70691 4.84869 9.54878 4.91996 9.45233 4.97445C9.36661 5.02321 9.29517 5.0693 9.24796 5.12379C9.20075 5.17857 9.15354 5.25558 9.10633 5.35603C9.05912 5.45649 9.02083 5.59265 9.00547 5.75451C8.99011 5.91637 8.97817 6.12489 8.97817 6.38104C8.97817 6.64859 8.9917 6.86401 9.01591 7.01861C9.04013 7.17322 9.0719 7.28512 9.10633 7.36213C9.14075 7.43915 9.17859 7.4883 9.22579 7.51549C9.273 7.54269 9.33616 7.55629 9.40759 7.55629C9.48688 7.55629 9.58333 7.51834 9.70691 7.44715C9.8305 7.37597 9.98862 7.29325 10.1847 7.19279C10.3807 7.09234 10.615 6.99473 10.8853 6.89428C11.1556 6.79382 11.4616 6.70997 11.8033 6.64859C12.1451 6.58722 12.5126 6.5558 12.9059 6.5558C13.2334 6.5558 13.5355 6.58722 13.79 6.64859C14.0446 6.70997 14.2533 6.79667 14.4146 6.9C14.5759 7.00334 14.6914 7.12522 14.7644 7.26849C14.8374 7.41175 14.8725 7.57077 14.8725 7.75832C14.8725 8.0095 14.7828 8.28275 14.6025 8.57578C14.4223 8.8688 14.1934 9.16468 13.9157 9.47198C13.638 9.77929 13.3335 10.0781 13.0032 10.3769C12.6729 10.6757 12.3456 10.943 12.0296 11.1715C11.7137 11.4001 11.4272 11.5801 11.1702 11.7173C10.9133 11.8546 10.7221 11.9379 10.5989 11.9666C10.4757 11.9952 10.3784 12.0238 10.3071 12.0467C10.2359 12.0695 10.149 12.0667 10.0526 12.0467C9.95615 12.0266 9.79802 11.9695 9.57448 11.8775C9.20764 11.7288 8.87568 11.5887 8.58535 11.4515C8.29501 11.3142 8.04841 11.1885 7.8463 11.0684C7.64419 10.9484 7.47591 10.8398 7.34146 10.7394C7.20701 10.6389 7.11056 10.557 7.05211 10.4909C6.99366 10.4249 6.937 10.3417 6.87856 10.2384C6.82011 10.1351 6.77291 9.99468 6.73849 9.82139C6.70407 9.64809 6.686 9.41334 6.686 9.12032C6.686 8.83302 6.70765 8.60115 6.75486 8.42214C6.80207 8.24312 6.85333 8.09986 6.90869 7.98511C6.96404 7.87037 7.03368 7.76991 7.1186 7.68147C7.20352 7.59302 7.29039 7.51549 7.3805 7.44715C7.47061 7.37882 7.5953 7.30478 7.75342 7.22778C7.91155 7.15077 8.05671 7.06233 8.19116 6.97389C8.19116 6.97389 8.4176 6.84631 8.74241 6.61728L7.05211 3.85946C6.78363 4.01275 6.52589 4.16741 6.28763 4.33215C6.04937 4.49689 5.82762 4.6645 5.62551 4.8421C5.4234 5.0197 5.24038 5.2058 5.07859 5.40043C4.9168 5.59506 4.77691 5.79541 4.6601 6.00396C4.54329 6.2125 4.44684 6.42958 4.37542 6.6558C4.30399 6.88203 4.26599 7.11675 4.26599 7.35986C4.26599 7.73959 4.34528 8.08073 4.5101 8.37946C4.67493 8.67819 4.86869 8.937 5.08866 9.15697C5.30863 9.37693 5.54153 9.55880 5.78336 9.70777C6.02518 9.85674 6.24157 9.97577 6.43254 10.0705C6.62351 10.1651 6.76701 10.2441 6.87498 10.3102C6.98295 10.3763 7.03904 10.4223 7.04726 10.4509C7.05547 10.4796 7.02936 10.511 6.96476 10.5482C6.90016 10.5854 6.77291 10.6446 6.58194 10.7222C6.39098 10.7999 6.14359 10.9113 5.85326 11.0542C5.56293 11.1971 5.24038 11.3858 4.8976 11.6187C4.55482 11.8517 4.20491 12.1361 3.84342 12.4664C3.4462 12.8319 3.10342 13.2117 2.8151 13.6041C2.52677 13.9965 2.29822 14.3985 2.13339 14.8051C1.96857 15.2117 1.88769 15.6183 1.88769 16.0206C1.88769 16.4889 1.96499 16.9069 2.12517 17.2791C2.28536 17.6512 2.51749 17.9658 2.8188 18.225C3.12012 18.4842 3.47532 18.6832 3.88538 18.8251C4.29544 18.967 4.75277 19.0379 5.25737 19.0379C5.69212 19.0379 6.10398 18.9842 6.49297 18.8785C6.88196 18.7727 7.26005 18.6267 7.62513 18.4448C7.9902 18.2628 8.35527 18.0495 8.71492 17.8066C9.07456 17.5638 9.44915 17.3009 9.83457 17.02C10.22 16.7392 10.6451 16.4432 11.1098 16.1358C11.5746 15.8284 12.0928 15.5182 12.6472 15.2117C12.772 15.1457 12.8729 15.0967 12.9413 15.0648C13.0098 15.0329 13.0741 15.0155 13.1398 15.0155C13.2055 15.0155 13.2861 15.0358 13.3845 15.0753C13.4828 15.1149 13.6224 15.1858 13.8032 15.2834C14.1079 15.4464 14.4269 15.6069 14.7458 15.7613C15.0647 15.9158 15.3808 16.0501 15.6897 16.1587C15.9986 16.2673 16.2952 16.3497 16.5797 16.4043C16.8642 16.4589 17.1201 16.4861 17.3451 16.4861C17.7893 16.4861 18.1599 16.4029 18.4516 16.2387C18.7433 16.0744 18.9782 15.8743 19.1438 15.6411C19.3094 15.408 19.4217 15.1606 19.4763 14.9006C19.5309 14.6405 19.559 14.4115 19.559 14.2125C19.559 13.8613 19.5042 13.5272 19.3963 13.2059C19.2884 12.8846 19.1352 12.5834 18.9353 12.3035C18.7354 12.0237 18.5012 11.7681 18.2328 11.5339C17.9643 11.2997 17.6816 11.0883 17.3889 10.8969C17.0962 10.7055 16.7991 10.5396 16.5061 10.3968C16.213 10.2541 15.9284 10.1365 15.6525 10.0476C15.3767 9.95866 15.1193 9.88748 14.8725 9.8421C14.6256 9.79672 14.415 9.76815 14.2337 9.76244C14.0524 9.75672 13.9157 9.76244 13.8252 9.77958C13.7348 9.79672 13.6538 9.81386 13.5823 9.82529L15.5455 9.92543Z" fill="#1D4ED8"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Google Workspace</p>
                        <p className="text-sm text-muted-foreground">Connect with Google Calendar and Google Drive</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {googleWorkspaceEnabled && <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Connected</Badge>}
                      <Switch
                        checked={googleWorkspaceEnabled}
                        onCheckedChange={setGoogleWorkspaceEnabled}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 5L13 13V15.5L14 16.5H16.5L21 12V5Z" fill="#1D4ED8"/>
                          <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Microsoft 365</p>
                        <p className="text-sm text-muted-foreground">Connect with Outlook Calendar and OneDrive</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {microsoftEnabled && <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Connected</Badge>}
                      <Switch
                        checked={microsoftEnabled}
                        onCheckedChange={setMicrosoftEnabled}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveIntegrations} disabled={loading}>
                  {loading ? 'Saving...' : 'Save Integration Settings'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system">
          <SystemSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanySettings;

