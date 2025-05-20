import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';

export default function Preferences() {
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    theme: 'system',
    autoTrack: true,
    showCatAnimations: true,
    dailyGoalHours: 4,
    weeklyReports: true,
    showStreak: true,
    showXP: true,
    showRank: true,
    idleTimeout: 5,
  });

  const handleSwitchChange = (name: string) => {
    setPreferences(prev => ({ ...prev, [name]: !prev[name as keyof typeof prev] }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setPreferences(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setPreferences(prev => ({ ...prev, [name]: value[0] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate saving preferences
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>
            Customize your CodeNeko experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Appearance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="theme">Theme</Label>
                    <p className="text-sm text-muted-foreground">
                      Choose your preferred theme
                    </p>
                  </div>
                  <Select
                    value={preferences.theme}
                    onValueChange={(value) => handleSelectChange('theme', value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showCatAnimations">Cat Animations</Label>
                    <p className="text-sm text-muted-foreground">
                      Show cat mascot animations
                    </p>
                  </div>
                  <Switch
                    id="showCatAnimations"
                    checked={preferences.showCatAnimations}
                    onCheckedChange={() => handleSwitchChange('showCatAnimations')}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Tracking</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoTrack">Automatic Tracking</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically track your coding activity
                    </p>
                  </div>
                  <Switch
                    id="autoTrack"
                    checked={preferences.autoTrack}
                    onCheckedChange={() => handleSwitchChange('autoTrack')}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dailyGoalHours">Daily Goal (hours)</Label>
                    <span className="w-12 rounded-md border border-input px-2 py-0.5 text-center text-sm">
                      {preferences.dailyGoalHours}
                    </span>
                  </div>
                  <Slider
                    id="dailyGoalHours"
                    min={1}
                    max={12}
                    step={1}
                    value={[preferences.dailyGoalHours]}
                    onValueChange={(value) => handleSliderChange('dailyGoalHours', value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="idleTimeout">Idle Timeout (minutes)</Label>
                    <p className="text-sm text-muted-foreground">
                      Stop tracking after inactivity
                    </p>
                  </div>
                  <Select
                    value={preferences.idleTimeout.toString()}
                    onValueChange={(value) => handleSelectChange('idleTimeout', value)}
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="15">15</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Gamification</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showStreak">Show Streak</Label>
                    <p className="text-sm text-muted-foreground">
                      Display your current streak
                    </p>
                  </div>
                  <Switch
                    id="showStreak"
                    checked={preferences.showStreak}
                    onCheckedChange={() => handleSwitchChange('showStreak')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showXP">Show XP</Label>
                    <p className="text-sm text-muted-foreground">
                      Display your XP progress
                    </p>
                  </div>
                  <Switch
                    id="showXP"
                    checked={preferences.showXP}
                    onCheckedChange={() => handleSwitchChange('showXP')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showRank">Show Rank</Label>
                    <p className="text-sm text-muted-foreground">
                      Display your leaderboard rank
                    </p>
                  </div>
                  <Switch
                    id="showRank"
                    checked={preferences.showRank}
                    onCheckedChange={() => handleSwitchChange('showRank')}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Preferences'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
