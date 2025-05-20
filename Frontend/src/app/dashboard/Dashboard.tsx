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
import { useTheme } from '@/lib/theme-provider';
import { useUser } from '@/lib/user-provider';
import { animate, stagger } from 'motion';
import catMascotLight from '@/assets/cat-mascot-enhanced.svg';
import catMascotDark from '@/assets/cat-mascot-dark.svg';

// Helper function to get greeting based on time of day
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

// Helper function to get random cat encouragement
const getCatEncouragement = () => {
  const encouragements = [
    "You're doing great today! Keep coding!",
    "Meow-velous progress on your projects!",
    "Your coding streak is paw-some!",
    "You're on track to level up soon!",
    "Purr-fect coding session yesterday!",
    "Your friends are impressed with your progress!",
    "Remember to take breaks for optimal purr-formance!",
    "You're becoming a coding ninja!",
  ];
  return encouragements[Math.floor(Math.random() * encouragements.length)];
};

export default function Dashboard() {
  const { user, isLoading } = useUser();
  const { theme } = useTheme();
  const [catMessage, setCatMessage] = useState(getCatEncouragement());
  const [showCatMessage, setShowCatMessage] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const statsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const catMascot = theme === 'dark' ? catMascotDark : catMascotLight;

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

  const handleCatClick = () => {
    setCatMessage(getCatEncouragement());
    setShowCatMessage(!showCatMessage);

    // Animate cat mascot
    const catElement = document.getElementById('dashboard-cat');
    if (catElement) {
      animate(
        catElement,
        { rotate: [0, 10, -10, 0] },
        { duration: 0.5 }
      );
    }
  };

  if (isLoading) {
    return <div className="flex h-[60vh] items-center justify-center">Loading your personalized dashboard...</div>;
  }

  if (!user) {
    return <div>Could not load user data</div>;
  }

  return (
    <div className="space-y-6">
      {/* Personalized greeting section */}
      <div className="relative flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{getGreeting()}, {user.name}!</h1>
          <p className="text-muted-foreground">Here's your personalized coding activity dashboard.</p>
        </div>

        <div className="relative flex items-center gap-3">
          <div
            id="dashboard-cat"
            className="relative h-16 w-16 cursor-pointer transition-transform hover:scale-110"
            onClick={handleCatClick}
          >
            <img src={catMascot} alt="CodeNeko Mascot" className="h-full w-full" />

            {showCatMessage && (
              <div className="absolute -top-16 right-0 w-48 rounded-lg bg-card p-2 text-sm shadow-md">
                <div className="relative">
                  {catMessage}
                  <div className="absolute -bottom-2 right-4 h-2 w-2 rotate-45 bg-card"></div>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="bg-primary/10 text-primary">
                Level {user.stats.level}
              </Badge>
              <Badge variant="outline" className="bg-primary/10">
                <TrophyIcon className="mr-1 h-3 w-3" /> {user.stats.currentStreak} day streak
              </Badge>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <Progress value={(user.stats.xpEarned / (user.stats.xpEarned + user.stats.xpToNextLevel)) * 100} className="h-2 w-24" />
              <span className="text-xs text-muted-foreground">{user.stats.xpEarned} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats cards with animations */}
      <div ref={statsRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-primary/5 pb-2">
            <CardTitle className="text-sm font-medium">Total Coding Time</CardTitle>
            <ClockIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{user.stats.totalCodingTime}</div>
            <p className="flex items-center text-xs text-muted-foreground">
              <span className={user.stats.weeklyChange.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                {user.stats.weeklyChange}
              </span>
              <span className="ml-1">from last week</span>
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-primary/5 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <TrophyIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{user.stats.currentStreak} days</div>
            <p className="flex items-center text-xs text-muted-foreground">
              Keep it up! Your best streak was 14 days
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-primary/5 pb-2">
            <CardTitle className="text-sm font-medium">XP Earned</CardTitle>
            <BrainCog className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{user.stats.xpEarned.toLocaleString()} XP</div>
            <p className="flex items-center text-xs text-muted-foreground">
              Level {user.stats.level} - {user.stats.xpToNextLevel} XP to next level
            </p>
            <Progress value={(user.stats.xpEarned / (user.stats.xpEarned + user.stats.xpToNextLevel)) * 100} className="mt-2 h-1.5" />
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different dashboard views */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 pt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-1 overflow-hidden transition-all duration-300 hover:shadow-md">
              <CardHeader className="bg-primary/5">
                <CardTitle className="flex items-center">
                  <FolderIcon className="mr-2 h-5 w-5 text-primary" />
                  Recent Projects
                </CardTitle>
                <CardDescription>Your most active projects this week</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div ref={projectsRef} className="space-y-4">
                  {user.recentProjects.map((project, index) => (
                    <div key={index} className="project-item flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <FolderIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{project.name}</p>
                          <p className="text-sm text-muted-foreground">{project.time}</p>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-primary/10">
                          <div className="progress-bar h-full w-0 rounded-full bg-primary"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/20 px-6 py-3">
                <Button variant="ghost" size="sm" className="ml-auto">View All Projects</Button>
              </CardFooter>
            </Card>

            <Card className="col-span-1 overflow-hidden transition-all duration-300 hover:shadow-md">
              <CardHeader className="bg-primary/5">
                <CardTitle className="flex items-center">
                  <CodeIcon className="mr-2 h-5 w-5 text-primary" />
                  Language Distribution
                </CardTitle>
                <CardDescription>Languages you've used this week</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  {user.languageDistribution.map((lang, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <CodeIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{lang.name}</p>
                          <p className="text-sm text-muted-foreground">{lang.percentage}%</p>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-primary/10">
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
              <CardFooter className="border-t bg-muted/20 px-6 py-3">
                <Button variant="ghost" size="sm" className="ml-auto">View Detailed Stats</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="pt-4">
          <Card>
            <CardHeader className="bg-primary/5">
              <CardTitle className="flex items-center">
                <StarIcon className="mr-2 h-5 w-5 text-primary" />
                Your Achievements
              </CardTitle>
              <CardDescription>Badges and milestones you've earned</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {user.stats.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center rounded-lg border p-4 text-center transition-all duration-300 hover:shadow-md ${
                      achievement.earned ? 'bg-primary/5' : 'bg-muted/20 opacity-60'
                    }`}
                  >
                    <div className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full ${
                      achievement.earned ? 'bg-primary/20' : 'bg-muted/30'
                    }`}>
                      {achievement.icon === 'sunrise' && <SunriseIcon className="h-6 w-6 text-primary" />}
                      {achievement.icon === 'moon' && <MoonIcon className="h-6 w-6 text-primary" />}
                      {achievement.icon === 'code' && <CodeIcon className="h-6 w-6 text-primary" />}
                    </div>
                    <h3 className="font-medium">{achievement.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{achievement.description}</p>
                    {achievement.earned && (
                      <Badge variant="outline" className="mt-2 bg-primary/10 text-primary">
                        Earned {achievement.date}
                      </Badge>
                    )}
                  </div>
                ))}

                {/* Additional achievement placeholders */}
                <div className="flex flex-col items-center rounded-lg border bg-muted/20 p-4 text-center opacity-60 transition-all duration-300 hover:shadow-md">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted/30">
                    <CoffeeIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium">Coffee Addict</h3>
                  <p className="mt-1 text-xs text-muted-foreground">Code for 10 hours in a single day</p>
                </div>

                <div className="flex flex-col items-center rounded-lg border bg-muted/20 p-4 text-center opacity-60 transition-all duration-300 hover:shadow-md">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted/30">
                    <ZapIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium">Speed Demon</h3>
                  <p className="mt-1 text-xs text-muted-foreground">Complete a project 2 days ahead of schedule</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/20 px-6 py-3">
              <Button variant="ghost" size="sm" className="ml-auto">View All Achievements</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="pt-4">
          <Card>
            <CardHeader className="bg-primary/5">
              <CardTitle className="flex items-center">
                <UsersIcon className="mr-2 h-5 w-5 text-primary" />
                Friend Activity
              </CardTitle>
              <CardDescription>See what your friends are up to</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div ref={socialRef} className="space-y-4">
                {user.friends.map((friend, index) => (
                  <div key={index} className="social-item flex items-start gap-4 rounded-lg border p-3 transition-all duration-300 hover:bg-muted/10">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarFallback className={friend.isOnline ? "bg-green-100 text-green-800" : ""}>
                        {friend.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <p className="font-medium">{friend.name}</p>
                        {friend.isOnline && (
                          <span className="ml-2 h-2 w-2 rounded-full bg-green-500"></span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Level {friend.level} • {friend.streak} day streak
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Active {friend.lastActive}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsUpIcon className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <span className="text-xs text-muted-foreground">{friend.xp.toLocaleString()} XP</span>
                    </div>
                  </div>
                ))}

                {/* Friend recommendation */}
                <div className="social-item flex items-start gap-4 rounded-lg border border-dashed p-3 transition-all duration-300 hover:bg-muted/10">
                  <Avatar className="h-10 w-10 border-2 border-primary/20">
                    <AvatarFallback>+</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">Invite Friends</p>
                    <p className="text-sm text-muted-foreground">
                      Coding is better with friends!
                    </p>
                  </div>
                  <Button size="sm" className="h-8">
                    Invite
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/20 px-6 py-3">
              <Button variant="ghost" size="sm" className="ml-auto">View Leaderboard</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
