import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ClockIcon,
  TrophyIcon,
  BrainCog,
  FolderIcon,
  CodeIcon,
  UsersIcon,
  StarIcon,
  MoonIcon,
  SunriseIcon,
  CoffeeIcon,
  ZapIcon,
  ThumbsUpIcon
} from 'lucide-react';
import { useUser } from '@/lib/user-provider';
import { animate, stagger } from 'motion';

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
    <div className="space-y-6">
      {/* Simplified header with greeting */}
      <div className="mb-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold md:text-3xl">{getGreeting()}, {user.name}</h1>
          <div className="mt-2 flex items-center gap-2">
            <Progress
              value={(user.stats.xpEarned / (user.stats.xpEarned + user.stats.xpToNextLevel)) * 100}
              className="h-2 w-32 md:w-48"
            />
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="font-medium text-primary">Level {user.stats.level}</span>
              <span>•</span>
              <span>{user.stats.xpEarned} XP</span>
              <span>•</span>
              <span className="flex items-center">
                <TrophyIcon className="mr-1 h-3 w-3 text-primary" /> {user.stats.currentStreak} day streak
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Simplified stats cards with animations */}
      <div ref={statsRef} className="grid gap-4 md:grid-cols-3">
        <Card className="overflow-hidden transition-all duration-200 hover:shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coding Time</CardTitle>
            <ClockIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold">{user.stats.totalCodingTime}</div>
            <p className="flex items-center text-xs text-muted-foreground">
              <span className={user.stats.weeklyChange.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                {user.stats.weeklyChange}
              </span>
              <span className="ml-1">from last week</span>
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all duration-200 hover:shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
            <TrophyIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold">{user.stats.currentStreak} days</div>
            <p className="text-xs text-muted-foreground">
              Best: 14 days
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all duration-200 hover:shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">XP Progress</CardTitle>
            <BrainCog className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold">{user.stats.xpToNextLevel} XP to level up</div>
            <Progress value={(user.stats.xpEarned / (user.stats.xpEarned + user.stats.xpToNextLevel)) * 100} className="mt-2 h-1.5" />
          </CardContent>
        </Card>
      </div>

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

        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1 overflow-hidden transition-all duration-200 hover:shadow-sm">
              <CardHeader className="py-3">
                <CardTitle className="flex items-center text-base">
                  <FolderIcon className="mr-2 h-4 w-4 text-primary" />
                  Recent Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 py-2">
                <div ref={projectsRef} className="space-y-3">
                  {user.recentProjects.slice(0, 3).map((project, index) => (
                    <div key={index} className="project-item flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <FolderIcon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{project.name}</p>
                          <p className="text-xs text-muted-foreground">{project.time}</p>
                        </div>
                        <div className="mt-1 h-1.5 w-full rounded-full bg-primary/10">
                          <div className="progress-bar h-full w-0 rounded-full bg-primary"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1 overflow-hidden transition-all duration-200 hover:shadow-sm">
              <CardHeader className="py-3">
                <CardTitle className="flex items-center text-base">
                  <CodeIcon className="mr-2 h-4 w-4 text-primary" />
                  Language Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 py-2">
                <div className="space-y-3">
                  {user.languageDistribution.slice(0, 3).map((lang, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <CodeIcon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{lang.name}</p>
                          <p className="text-xs text-muted-foreground">{lang.percentage}%</p>
                        </div>
                        <div className="mt-1 h-1.5 w-full rounded-full bg-primary/10">
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
        </TabsContent>

        <TabsContent value="achievements" className="pt-4">
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="flex items-center text-base">
                <StarIcon className="mr-2 h-4 w-4 text-primary" />
                Your Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-2">
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                {user.stats.achievements.slice(0, 4).map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center rounded-lg border p-3 text-center transition-all duration-200 hover:shadow-sm ${
                      achievement.earned ? 'bg-primary/5' : 'bg-muted/10 opacity-60'
                    }`}
                  >
                    <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
                      achievement.earned ? 'bg-primary/20' : 'bg-muted/20'
                    }`}>
                      {achievement.icon === 'sunrise' && <SunriseIcon className="h-5 w-5 text-primary" />}
                      {achievement.icon === 'moon' && <MoonIcon className="h-5 w-5 text-primary" />}
                      {achievement.icon === 'code' && <CodeIcon className="h-5 w-5 text-primary" />}
                    </div>
                    <h3 className="text-sm font-medium">{achievement.title}</h3>
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

        <TabsContent value="social" className="pt-4">
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="flex items-center text-base">
                <UsersIcon className="mr-2 h-4 w-4 text-primary" />
                Friend Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-2">
              <div ref={socialRef} className="space-y-3">
                {user.friends.slice(0, 3).map((friend, index) => (
                  <div key={index} className="social-item flex items-center gap-3 rounded-lg border p-2 transition-all duration-200 hover:bg-muted/5">
                    <Avatar className="h-8 w-8 border border-primary/10">
                      <AvatarFallback className={friend.isOnline ? "bg-green-100 text-green-800" : ""}>
                        {friend.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <p className="text-sm font-medium truncate">{friend.name}</p>
                        {friend.isOnline && (
                          <span className="ml-2 h-1.5 w-1.5 rounded-full bg-green-500"></span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        Level {friend.level} • {friend.streak} day streak
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-primary font-medium">{friend.xp.toLocaleString()} XP</span>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ThumbsUpIcon className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Friend recommendation - simplified */}
                <div className="social-item flex items-center gap-3 rounded-lg border border-dashed p-2 transition-all duration-200 hover:bg-muted/5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    +
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Invite Friends</p>
                    <p className="text-xs text-muted-foreground">
                      Coding is better with friends
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    Invite
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
