import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3Icon, ClockIcon, CodeIcon, CalendarIcon } from 'lucide-react';

export default function CodingStats() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Coding Stats</h1>
        <p className="text-muted-foreground">Detailed analytics of your coding activity</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="languages">Languages</TabsTrigger>
          <TabsTrigger value="time">Time Distribution</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Coding Time</CardTitle>
                <ClockIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124h 45m</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Languages Used</CardTitle>
                <CodeIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">TypeScript, JavaScript, Python...</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">3 personal, 2 work</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Coding Days</CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">22</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
              <CardDescription>Your coding hours for the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <div className="flex h-full items-end gap-2">
                  {[40, 25, 65, 50, 80, 60, 30].map((height, i) => (
                    <div key={i} className="relative flex h-full flex-1 flex-col justify-end">
                      <div
                        className="bg-primary rounded-t-md"
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="mt-2 text-center text-xs">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="languages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Language Distribution</CardTitle>
              <CardDescription>Languages you've used this month</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">Language distribution chart placeholder</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="time" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Time Distribution</CardTitle>
              <CardDescription>When you code the most</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">Time distribution chart placeholder</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Breakdown</CardTitle>
              <CardDescription>Time spent on each project</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">Project breakdown chart placeholder</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
