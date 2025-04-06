
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { format, startOfMonth, endOfMonth, addDays, differenceInHours, parse } from 'date-fns';
import { Clock, Plus, Calendar as CalendarIcon, Info, Clock3, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface TimeEntry {
  date: Date;
  clockIn: string;
  clockOut: string;
  hours: number;
  status: 'Present' | 'Late' | 'Absent' | 'Weekend' | 'Holiday';
  notes?: string;
}

const EmpAttendance = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [isClockedIn, setIsClockedIn] = useState<boolean>(false);
  const [clockInTime, setClockInTime] = useState<string>('');
  const [isManualEntryOpen, setIsManualEntryOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [manualClockIn, setManualClockIn] = useState<string>('');
  const [manualClockOut, setManualClockOut] = useState<string>('');
  const [manualReason, setManualReason] = useState<string>('');
  
  // Mock data for time entries
  const generateTimeEntries = (startDate: Date): TimeEntry[] => {
    const endDate = endOfMonth(startDate);
    const entries: TimeEntry[] = [];
    
    let currentDate = startOfMonth(startDate);
    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      // Generate mock entries for weekdays in the past
      if (!isWeekend && currentDate < new Date()) {
        const isHoliday = currentDate.getDate() === 15; // Mock holiday on 15th
        
        if (isHoliday) {
          entries.push({
            date: new Date(currentDate),
            clockIn: '--:--',
            clockOut: '--:--',
            hours: 0,
            status: 'Holiday',
            notes: 'Company Holiday'
          });
        } else {
          const isAbsent = Math.random() > 0.9; // 10% chance of absence
          
          if (isAbsent) {
            entries.push({
              date: new Date(currentDate),
              clockIn: '--:--',
              clockOut: '--:--',
              hours: 0,
              status: 'Absent',
              notes: 'No clock-in recorded'
            });
          } else {
            // Random time between 8:30 and 9:30
            const randomHour = 8;
            const randomMinute = Math.floor(Math.random() * 60);
            const clockIn = `${randomHour.toString().padStart(2, '0')}:${randomMinute.toString().padStart(2, '0')}`;
            
            // Work hours between 7.5 and 9 hours
            const workHours = 8 + (Math.random() * 1 - 0.5);
            const clockOutHour = randomHour + Math.floor(workHours);
            const clockOutMinute = Math.floor(randomMinute + (workHours % 1) * 60);
            const clockOut = `${clockOutHour.toString().padStart(2, '0')}:${clockOutMinute.toString().padStart(2, '0')}`;
            
            const isLate = randomMinute > 15;
            
            entries.push({
              date: new Date(currentDate),
              clockIn,
              clockOut,
              hours: parseFloat(workHours.toFixed(1)),
              status: isLate ? 'Late' : 'Present',
              notes: isLate ? 'Clocked in late' : undefined
            });
          }
        }
      } else if (isWeekend) {
        entries.push({
          date: new Date(currentDate),
          clockIn: '--:--',
          clockOut: '--:--',
          hours: 0,
          status: 'Weekend',
          notes: dayOfWeek === 0 ? 'Sunday' : 'Saturday'
        });
      }
      
      currentDate = addDays(currentDate, 1);
    }
    
    return entries;
  };
  
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(generateTimeEntries(date));
  
  const handleClockAction = () => {
    const now = new Date();
    const timeString = format(now, 'HH:mm');
    
    if (!isClockedIn) {
      setIsClockedIn(true);
      setClockInTime(timeString);
      
      toast({
        title: 'Clocked In',
        description: `You clocked in at ${timeString}`,
      });
    } else {
      setIsClockedIn(false);
      
      const hoursWorked = differenceInHours(
        now, 
        parse(clockInTime, 'HH:mm', new Date())
      );
      
      toast({
        title: 'Clocked Out',
        description: `You clocked out at ${timeString}. Hours worked: ${hoursWorked.toFixed(1)}`,
      });
      
      // Add to time entries - Fix the type error by explicitly defining status as 'Present'
      const todayEntry: TimeEntry = {
        date: new Date(),
        clockIn: clockInTime,
        clockOut: timeString,
        hours: parseFloat(hoursWorked.toFixed(1)),
        status: 'Present'
      };
      
      setTimeEntries([todayEntry, ...timeEntries]);
    }
  };
  
  const handleMonthChange = (newDate: Date) => {
    setDate(newDate);
    setTimeEntries(generateTimeEntries(newDate));
  };
  
  const handleManualEntrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate) {
      toast({
        title: 'Error',
        description: 'Please select a date',
        variant: 'destructive'
      });
      return;
    }
    
    if (!manualClockIn || !manualClockOut) {
      toast({
        title: 'Error',
        description: 'Please enter both clock in and clock out times',
        variant: 'destructive'
      });
      return;
    }
    
    // Calculate hours between clock in and clock out
    const clockInDateTime = parse(manualClockIn, 'HH:mm', selectedDate);
    const clockOutDateTime = parse(manualClockOut, 'HH:mm', selectedDate);
    
    if (clockOutDateTime <= clockInDateTime) {
      toast({
        title: 'Error',
        description: 'Clock out time must be after clock in time',
        variant: 'destructive'
      });
      return;
    }
    
    const hoursWorked = differenceInHours(clockOutDateTime, clockInDateTime);
    
    toast({
      title: 'Request Submitted',
      description: 'Your manual time entry request has been submitted for approval',
    });
    
    setIsManualEntryOpen(false);
    setSelectedDate(undefined);
    setManualClockIn('');
    setManualClockOut('');
    setManualReason('');
  };
  
  const getStatusColor = (status: TimeEntry['status']) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-800 border-green-200';
      case 'Late': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Absent': return 'bg-red-100 text-red-800 border-red-200';
      case 'Weekend': return 'bg-gray-100 text-gray-500 border-gray-200';
      case 'Holiday': return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Attendance</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="col-span-1 md:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle>Clock In/Out</CardTitle>
            <CardDescription>Record your attendance for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col items-center sm:items-start gap-2 w-full sm:w-auto">
                <div className="text-xl font-bold">{format(new Date(), 'EEEE, MMMM d, yyyy')}</div>
                <div className="text-3xl font-bold text-primary" id="clock">
                  {format(new Date(), 'h:mm a')}
                </div>
              </div>
              
              <div className="w-full sm:w-auto">
                {isClockedIn ? (
                  <Button 
                    className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white"
                    onClick={handleClockAction}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Clock Out
                  </Button>
                ) : (
                  <Button 
                    className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white"
                    onClick={handleClockAction}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Clock In
                  </Button>
                )}
                
                <div className="text-center mt-2">
                  {isClockedIn ? (
                    <div className="text-sm text-gray-500">
                      Working since {clockInTime}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">
                      Not clocked in yet today
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button 
                variant="outline" 
                onClick={() => setIsManualEntryOpen(true)}
                className="text-sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Request Manual Entry
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Monthly Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Days Present</span>
                <span className="font-medium">18</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Days Late</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Days Absent</span>
                <span className="font-medium">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Hours</span>
                <span className="font-medium">162.5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <CardTitle>Attendance History</CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleMonthChange(new Date(date.getFullYear(), date.getMonth() - 1, 1))}
              >
                Previous
              </Button>
              <span className="font-medium">{format(date, 'MMMM yyyy')}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleMonthChange(new Date(date.getFullYear(), date.getMonth() + 1, 1))}
              >
                Next
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list" className="space-y-4">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Clock In</TableHead>
                    <TableHead>Clock Out</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeEntries.length > 0 ? (
                    timeEntries
                      .sort((a, b) => b.date.getTime() - a.date.getTime())
                      .map((entry, index) => (
                        <TableRow key={index}>
                          <TableCell>{format(entry.date, 'EEE, MMM d')}</TableCell>
                          <TableCell>{entry.clockIn}</TableCell>
                          <TableCell>{entry.clockOut}</TableCell>
                          <TableCell>{entry.hours > 0 ? entry.hours : '--'}</TableCell>
                          <TableCell>
                            <div className={`inline-flex items-center px-2 py-1 rounded-md border ${getStatusColor(entry.status)}`}>
                              {entry.status}
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {entry.notes || '--'}
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        No attendance records found for this month.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="calendar">
              <div className="text-center py-20">
                Calendar view is under development.
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Dialog open={isManualEntryOpen} onOpenChange={setIsManualEntryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Manual Time Entry</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleManualEntrySubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    disabled={(date) => date > new Date()}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clockIn">Clock In Time</Label>
                <div className="flex items-center">
                  <Clock3 className="mr-2 h-4 w-4 text-gray-500" />
                  <Input
                    id="clockIn"
                    type="time"
                    value={manualClockIn}
                    onChange={(e) => setManualClockIn(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clockOut">Clock Out Time</Label>
                <div className="flex items-center">
                  <Clock3 className="mr-2 h-4 w-4 text-gray-500" />
                  <Input
                    id="clockOut"
                    type="time"
                    value={manualClockOut}
                    onChange={(e) => setManualClockOut(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Manual Entry</Label>
              <Textarea
                id="reason"
                placeholder="Please provide a reason for this manual time entry request"
                value={manualReason}
                onChange={(e) => setManualReason(e.target.value)}
                rows={3}
                required
              />
            </div>
            
            <Alert variant="default">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Manual time entries require approval from your supervisor. Please provide a detailed reason.
              </AlertDescription>
            </Alert>
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsManualEntryOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit Request</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmpAttendance;
