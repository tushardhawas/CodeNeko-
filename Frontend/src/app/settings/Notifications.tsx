import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { BellIcon, EnvelopeIcon, DevicePhoneMobileIcon, ComputerDesktopIcon } from 'lucide-react';

export default function Notifications() {
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    email: {
      weeklyReport: true,
      achievements: true,
      streakReminders: true,
      productUpdates: false,
    },
    push: {
      dailyReminder: true,
      achievements: true,
      streakAlert: true,
      friendActivity: false,
    },
    desktop: {
      sessionStart: true,
      sessionEnd: true,
      goalAchieved: true,
      inactivityAlert: true,
    },
    frequency: 'daily',
  });

  const handleSwitchChange = (category: string, name: string) => {
    setNotifications(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [name]: !prev[category as keyof typeof prev][name],
      },
    }));
  };

  const handleSelectChange = (value: string) => {
    setNotifications(prev => ({ ...prev, frequency: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate saving notification settings
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>
            Manage how and when you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <EnvelopeIcon className="h-5 w-5" />
                <h3 className="text-lg font-medium">Email Notifications</h3>
              </div>
              <div className="space-y-4 rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-weekly">Weekly Report</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a summary of your weekly coding activity
                    </p>
                  </div>
                  <Switch
                    id="email-weekly"
                    checked={notifications.email.weeklyReport}
                    onCheckedChange={() => handleSwitchChange('email', 'weeklyReport')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-achievements">Achievements</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when you earn new achievements
                    </p>
                  </div>
                  <Switch
                    id="email-achievements"
                    checked={notifications.email.achievements}
                    onCheckedChange={() => handleSwitchChange('email', 'achievements')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-streak">Streak Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Get reminded to maintain your coding streak
                    </p>
                  </div>
                  <Switch
                    id="email-streak"
                    checked={notifications.email.streakReminders}
                    onCheckedChange={() => handleSwitchChange('email', 'streakReminders')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-updates">Product Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about new features and improvements
                    </p>
                  </div>
                  <Switch
                    id="email-updates"
                    checked={notifications.email.productUpdates}
                    onCheckedChange={() => handleSwitchChange('email', 'productUpdates')}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <DevicePhoneMobileIcon className="h-5 w-5" />
                <h3 className="text-lg font-medium">Push Notifications</h3>
              </div>
              <div className="space-y-4 rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-reminder">Daily Reminder</Label>
                    <p className="text-sm text-muted-foreground">
                      Get a daily reminder to code
                    </p>
                  </div>
                  <Switch
                    id="push-reminder"
                    checked={notifications.push.dailyReminder}
                    onCheckedChange={() => handleSwitchChange('push', 'dailyReminder')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-achievements">Achievements</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when you earn new achievements
                    </p>
                  </div>
                  <Switch
                    id="push-achievements"
                    checked={notifications.push.achievements}
                    onCheckedChange={() => handleSwitchChange('push', 'achievements')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-streak">Streak Alert</Label>
                    <p className="text-sm text-muted-foreground">
                      Get alerted when your streak is at risk
                    </p>
                  </div>
                  <Switch
                    id="push-streak"
                    checked={notifications.push.streakAlert}
                    onCheckedChange={() => handleSwitchChange('push', 'streakAlert')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-friend">Friend Activity</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about your friends' achievements
                    </p>
                  </div>
                  <Switch
                    id="push-friend"
                    checked={notifications.push.friendActivity}
                    onCheckedChange={() => handleSwitchChange('push', 'friendActivity')}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ComputerDesktopIcon className="h-5 w-5" />
                <h3 className="text-lg font-medium">Desktop Notifications</h3>
              </div>
              <div className="space-y-4 rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="desktop-start">Session Start</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when your coding session starts
                    </p>
                  </div>
                  <Switch
                    id="desktop-start"
                    checked={notifications.desktop.sessionStart}
                    onCheckedChange={() => handleSwitchChange('desktop', 'sessionStart')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="desktop-end">Session End</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when your coding session ends
                    </p>
                  </div>
                  <Switch
                    id="desktop-end"
                    checked={notifications.desktop.sessionEnd}
                    onCheckedChange={() => handleSwitchChange('desktop', 'sessionEnd')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="desktop-goal">Goal Achieved</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when you reach your daily goal
                    </p>
                  </div>
                  <Switch
                    id="desktop-goal"
                    checked={notifications.desktop.goalAchieved}
                    onCheckedChange={() => handleSwitchChange('desktop', 'goalAchieved')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="desktop-inactive">Inactivity Alert</Label>
                    <p className="text-sm text-muted-foreground">
                      Get alerted when you've been inactive
                    </p>
                  </div>
                  <Switch
                    id="desktop-inactive"
                    checked={notifications.desktop.inactivityAlert}
                    onCheckedChange={() => handleSwitchChange('desktop', 'inactivityAlert')}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Frequency</h3>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="frequency">Reminder Frequency</Label>
                  <p className="text-sm text-muted-foreground">
                    How often you want to receive reminders
                  </p>
                </div>
                <Select
                  value={notifications.frequency}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekdays">Weekdays Only</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Notification Settings'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
