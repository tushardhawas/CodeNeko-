import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3Icon, ClockIcon, TrophyIcon, BrainCog, FolderIcon, CodeIcon } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your coding activity.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Coding Time</CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24h 30m</div>
            <p className="text-xs text-muted-foreground">+2.5% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <TrophyIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">XP Earned</CardTitle>
            <BrainCog className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250 XP</div>
            <p className="text-xs text-muted-foreground">Level 5 - 750 XP to next level</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Your most active projects this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <FolderIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">CodeNeko</p>
                    <p className="text-sm text-muted-foreground">10h 15m</p>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-primary/10">
                    <div className="h-full w-[75%] rounded-full bg-primary"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <FolderIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Personal Website</p>
                    <p className="text-sm text-muted-foreground">5h 45m</p>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-primary/10">
                    <div className="h-full w-[40%] rounded-full bg-primary"></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Language Distribution</CardTitle>
            <CardDescription>Languages you've used this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <CodeIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">TypeScript</p>
                    <p className="text-sm text-muted-foreground">60%</p>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-primary/10">
                    <div className="h-full w-[60%] rounded-full bg-primary"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <CodeIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">CSS</p>
                    <p className="text-sm text-muted-foreground">25%</p>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-primary/10">
                    <div className="h-full w-[25%] rounded-full bg-primary"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <CodeIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">HTML</p>
                    <p className="text-sm text-muted-foreground">15%</p>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-primary/10">
                    <div className="h-full w-[15%] rounded-full bg-primary"></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
