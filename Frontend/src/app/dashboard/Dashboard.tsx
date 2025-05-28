import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  ClockIcon,
  TrophyIcon,
  CalendarIcon,
  TrendingUpIcon,
  MenuIcon,
  BarChart3Icon,
  FolderIcon,
  SettingsIcon,
  CatIcon,
  CodeIcon,
  StarIcon,
  SunriseIcon,
  MoonIcon,
  UsersIcon,
  ThumbsUpIcon,
  ActivityIcon,
  ZapIcon
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/lib/user-provider';
import { animate, stagger } from 'motion';
import { Link } from 'react-router-dom';
import { StreakCalendar } from '@/components/dashboard/StreakCalendar';

// Helper function to get greeting based on time of day
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

// Helper function removed as cat mascot is now in the header

export default function Dashboard() {
  const { user, isLoading } = useUser();
  const [activeTab, setActiveTab] = useState('overview');
  const statsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  // Animation effect when component mounts
  useEffect(() => {
    if (!isLoading && statsRef.current) {
      // Animate stats cards with staggered effect
      const statCards = Array.from(statsRef.current.children);
      animate(
        statCards,
        { opacity: [0, 1], y: [20, 0] },
        { duration: 0.5, delay: stagger(0.1) }
      );
    }

    if (!isLoading && projectsRef.current) {
      // Animate project bars
      const projectItems = Array.from(projectsRef.current.querySelectorAll('.project-item'));
      animate(
        projectItems,
        { opacity: [0, 1], x: [-20, 0] },
        { duration: 0.5, delay: stagger(0.1) }
      );

      // Animate progress bars
      const progressBars = Array.from(projectsRef.current.querySelectorAll('.progress-bar'));
      progressBars.forEach((bar, index) => {
        const width = user?.recentProjects[index]?.percentage || 0;
        animate(
          bar as HTMLElement,
          { width: ['0%', `${width}%`] },
          { duration: 1, delay: 0.5 + (index * 0.2) }
        );
      });
    }

    if (!isLoading && socialRef.current) {
      // Animate social activity items
      const socialItems = Array.from(socialRef.current.querySelectorAll('.social-item'));
      animate(
        socialItems,
        { opacity: [0, 1], scale: [0.95, 1] },
        { duration: 0.5, delay: stagger(0.1) }
      );
    }
  }, [isLoading, user]);

  // Removed cat click handler as it's now in the header

  if (isLoading) {
    return <div className="flex h-[60vh] items-center justify-center">Loading your personalized dashboard...</div>;
  }

  if (!user) {
    return <div>Could not load user data</div>;
  }

  return (
    <div className="space-y-4">
      {/* Simplified header with greeting */}
      <div className="mb-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold md:text-3xl">{getGreeting()}, {user.name}</h1>
          <p className="text-sm text-muted-foreground mt-1">Ready to code today?</p>
        </div>
      </div>

      {/* Main dashboard layout with sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left content area */}
        <div className="lg:col-span-3 space-y-4">
          {/* Essential metrics in small rectangular boxes */}
          <div ref={statsRef} className="grid gap-2 grid-cols-3">
            {/* Coding Time */}
            <Card className="overflow-hidden transition-all duration-200 hover:shadow-sm">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Coding Time</p>
                    <p className="text-lg font-bold">{user.stats.totalCodingTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Streak */}
            <Card className="overflow-hidden transition-all duration-200 hover:shadow-sm">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <TrophyIcon className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Streak</p>
                    <p className="text-lg font-bold">{user.stats.currentStreak} days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance */}
            <Card className="overflow-hidden transition-all duration-200 hover:shadow-sm">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <ActivityIcon className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Performance</p>
                    <p className="text-lg font-bold">85%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Streak Calendar - Prominent position */}
          <StreakCalendar />

          {/* Simplified tabs for different dashboard views */}
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between">
              <TabsList className="grid grid-cols-3 w-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
              </TabsList>

              <Button variant="ghost" size="sm" className="text-xs">
                View All
              </Button>
            </div>

            <TabsContent value="overview" className="space-y-3 pt-3">
              <div className="grid gap-3 md:grid-cols-2">
                <Card className="col-span-1 overflow-hidden transition-all duration-200 hover:shadow-sm">
                  <CardHeader className="py-2">
                    <CardTitle className="flex items-center text-sm">
                      <FolderIcon className="mr-2 h-4 w-4 text-primary" />
                      Recent Projects
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-3 py-2">
                    <div ref={projectsRef} className="space-y-2">
                      {user.recentProjects.slice(0, 3).map((project, index) => (
                        <div key={index} className="project-item flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                            <FolderIcon className="h-3 w-3 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-medium">{project.name}</p>
                              <p className="text-xs text-muted-foreground">{project.time}</p>
                            </div>
                            <div className="mt-1 h-1 w-full rounded-full bg-primary/10">
                              <div className="progress-bar h-full w-0 rounded-full bg-primary"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-1 overflow-hidden transition-all duration-200 hover:shadow-sm">
                  <CardHeader className="py-2">
                    <CardTitle className="flex items-center text-sm">
                      <CodeIcon className="mr-2 h-4 w-4 text-primary" />
                      Language Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-3 py-2">
                    <div className="space-y-2">
                      {user.languageDistribution.slice(0, 3).map((lang, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                            <CodeIcon className="h-3 w-3 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-medium">{lang.name}</p>
                              <p className="text-xs text-muted-foreground">{lang.percentage}%</p>
                            </div>
                            <div className="mt-1 h-1 w-full rounded-full bg-primary/10">
                              <div
                                className="h-full rounded-full bg-primary transition-all duration-1000"
                                style={{ width: `${lang.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional content sections */}
              <div className="grid gap-3 md:grid-cols-2">
                <Card className="overflow-hidden transition-all duration-200 hover:shadow-sm">
                  <CardHeader className="py-2">
                    <CardTitle className="flex items-center text-sm">
                      <TrendingUpIcon className="mr-2 h-4 w-4 text-primary" />
                      Progress Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-3 py-2">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Best day this week</span>
                        <span className="text-xs font-medium">Wednesday (6.2h)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Most productive time</span>
                        <span className="text-xs font-medium">2-4 PM</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Favorite language</span>
                        <span className="text-xs font-medium">TypeScript</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Weekly goal progress</span>
                        <span className="text-xs font-medium text-green-600">85%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden transition-all duration-200 hover:shadow-sm">
                  <CardHeader className="py-2">
                    <CardTitle className="flex items-center text-sm">
                      <ZapIcon className="mr-2 h-4 w-4 text-primary" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-3 py-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        Start Timer
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        New Project
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        View Stats
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="pt-3">
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="flex items-center text-sm">
                    <StarIcon className="mr-2 h-4 w-4 text-primary" />
                    Your Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-3 py-2">
                  <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
                    {user.stats.achievements.slice(0, 4).map((achievement, index) => (
                      <div
                        key={index}
                        className={`flex flex-col items-center rounded-lg border p-2 text-center transition-all duration-200 hover:shadow-sm ${
                          achievement.earned ? 'bg-primary/5' : 'bg-muted/10 opacity-60'
                        }`}
                      >
                        <div className={`mb-1 flex h-8 w-8 items-center justify-center rounded-full ${
                          achievement.earned ? 'bg-primary/20' : 'bg-muted/20'
                        }`}>
                          {achievement.icon === 'sunrise' && <SunriseIcon className="h-4 w-4 text-primary" />}
                          {achievement.icon === 'moon' && <MoonIcon className="h-4 w-4 text-primary" />}
                          {achievement.icon === 'code' && <CodeIcon className="h-4 w-4 text-primary" />}
                        </div>
                        <h3 className="text-xs font-medium">{achievement.title}</h3>
                        {achievement.earned && (
                          <Badge variant="outline" className="mt-1 bg-primary/10 text-primary text-xs">
                            {achievement.date}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="social" className="pt-3">
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="flex items-center text-sm">
                    <UsersIcon className="mr-2 h-4 w-4 text-primary" />
                    Friend Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-3 py-2">
                  <div ref={socialRef} className="space-y-2">
                    {user.friends.slice(0, 3).map((friend, index) => (
                      <div key={index} className="social-item flex items-center gap-2 rounded-lg border p-2 transition-all duration-200 hover:bg-muted/5">
                        <Avatar className="h-6 w-6 border border-primary/10">
                          <AvatarFallback className={friend.isOnline ? "bg-green-100 text-green-800" : ""}>
                            {friend.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center">
                            <p className="text-xs font-medium truncate">{friend.name}</p>
                            {friend.isOnline && (
                              <span className="ml-1 h-1 w-1 rounded-full bg-green-500"></span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {friend.streak} day streak
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ThumbsUpIcon className="h-3 w-3 text-muted-foreground" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Today's Goals */}
          <Card className="overflow-hidden transition-all duration-200 hover:shadow-sm">
            <CardHeader className="py-2">
              <CardTitle className="flex items-center text-sm">
                <TrendingUpIcon className="mr-2 h-4 w-4 text-primary" />
                Today's Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 py-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-xs">Code for 2 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <span className="text-xs">Complete 3 tasks</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                  <span className="text-xs">Review code</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="overflow-hidden transition-all duration-200 hover:shadow-sm">
            <CardHeader className="py-2">
              <CardTitle className="flex items-center text-sm">
                <ActivityIcon className="mr-2 h-4 w-4 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 py-2">
              <div className="space-y-2">
                <div className="text-xs">
                  <span className="font-medium">2 hours ago</span>
                  <p className="text-muted-foreground">Worked on React project</p>
                </div>
                <div className="text-xs">
                  <span className="font-medium">5 hours ago</span>
                  <p className="text-muted-foreground">Completed TypeScript task</p>
                </div>
                <div className="text-xs">
                  <span className="font-medium">Yesterday</span>
                  <p className="text-muted-foreground">Started new project</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="overflow-hidden transition-all duration-200 hover:shadow-sm">
            <CardHeader className="py-2">
              <CardTitle className="flex items-center text-sm">
                <BarChart3Icon className="mr-2 h-4 w-4 text-primary" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 py-2">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>This Week</span>
                  <span className="font-medium">12.5h</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>This Month</span>
                  <span className="font-medium">48.2h</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Projects</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Languages</span>
                  <span className="font-medium">5</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cat Companion Status */}
          <Card className="overflow-hidden transition-all duration-200 hover:shadow-sm">
            <CardHeader className="py-2">
              <CardTitle className="flex items-center text-sm">
                <CatIcon className="mr-2 h-4 w-4 text-primary" />
                Cat Status
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 py-2">
              <div className="text-center">
                <div className="text-2xl mb-1">😸</div>
                <p className="text-xs font-medium">Happy</p>
                <p className="text-xs text-muted-foreground">Your cat is pleased with your progress!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
