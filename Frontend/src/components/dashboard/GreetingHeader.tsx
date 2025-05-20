import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrophyIcon, CoffeeIcon, SunIcon, MoonIcon, SunriseIcon, SunsetIcon } from 'lucide-react';
import { useTheme } from '@/lib/theme-provider';
import { useUser } from '@/lib/user-provider';
import { animate } from 'motion';
import catMascotLight from '@/assets/cat-mascot-enhanced.svg';
import catMascotDark from '@/assets/cat-mascot-dark.svg';

// Helper function to get greeting based on time of day
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 6) return { text: 'Good night', icon: <MoonIcon className="h-5 w-5" /> };
  if (hour < 12) return { text: 'Good morning', icon: <SunriseIcon className="h-5 w-5" /> };
  if (hour < 17) return { text: 'Good afternoon', icon: <SunIcon className="h-5 w-5" /> };
  if (hour < 22) return { text: 'Good evening', icon: <SunsetIcon className="h-5 w-5" /> };
  return { text: 'Good night', icon: <MoonIcon className="h-5 w-5" /> };
};

// Helper function to get motivational message based on time and user data
const getMotivationalMessage = (user: any) => {
  const hour = new Date().getHours();
  const messages = [
    // Morning messages
    ...(hour < 12 ? [
      `Ready to start a productive day of coding?`,
      `Let's make today count! Your streak is at ${user.stats.currentStreak} days.`,
      `Morning coding sessions are the most productive!`,
      `${user.stats.xpToNextLevel} XP to go until your next level!`,
    ] : []),
    
    // Afternoon messages
    ...(hour >= 12 && hour < 17 ? [
      `Keep the momentum going this afternoon!`,
      `You're making great progress today!`,
      `Need a coffee break? You've earned it!`,
      `You're ${Math.round((user.stats.xpEarned / (user.stats.xpEarned + user.stats.xpToNextLevel)) * 100)}% of the way to level ${user.stats.level + 1}!`,
    ] : []),
    
    // Evening messages
    ...(hour >= 17 ? [
      `Wrapping up for the day or just getting started?`,
      `Evening coding sessions can be very productive!`,
      `Don't forget to commit your changes before you finish!`,
      `Just ${user.stats.xpToNextLevel} more XP to reach level ${user.stats.level + 1}!`,
    ] : []),
    
    // General messages
    `Your friends have been active today!`,
    `You've been coding consistently for ${user.stats.currentStreak} days!`,
    `You're in the top 10% of active users this week!`,
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
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

export function GreetingHeader() {
  const { user, isLoading } = useUser();
  const { theme } = useTheme();
  const [greeting, setGreeting] = useState(getGreeting());
  const [catMessage, setCatMessage] = useState('');
  const [showCatMessage, setShowCatMessage] = useState(false);
  const [motivationalMessage, setMotivationalMessage] = useState('');
  const catMascot = theme === 'dark' ? catMascotDark : catMascotLight;

  useEffect(() => {
    // Update greeting based on time of day
    const updateGreeting = () => {
      setGreeting(getGreeting());
    };
    
    // Set initial greeting
    updateGreeting();
    
    // Update greeting every hour
    const interval = setInterval(updateGreeting, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLoading && user) {
      setMotivationalMessage(getMotivationalMessage(user));
      setCatMessage(getCatEncouragement());
    }
  }, [isLoading, user]);

  const handleCatClick = () => {
    setCatMessage(getCatEncouragement());
    setShowCatMessage(!showCatMessage);
    
    // Animate cat mascot
    const catElement = document.getElementById('greeting-cat');
    if (catElement) {
      animate(
        catElement,
        { rotate: [0, 10, -10, 0] },
        { duration: 0.5 }
      );
    }
  };

  if (isLoading || !user) {
    return <div className="h-24 animate-pulse rounded-lg bg-muted"></div>;
  }

  return (
    <div className="relative mb-6 rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">
              {greeting.text}, {user.name}!
            </h1>
            <span className="text-primary">{greeting.icon}</span>
          </div>
          <p className="mt-1 text-muted-foreground">{motivationalMessage}</p>
        </div>
        
        <div className="relative flex items-center gap-3">
          <div 
            id="greeting-cat"
            className="relative h-16 w-16 cursor-pointer transition-transform hover:scale-110 cat-wiggle"
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
              <Progress 
                value={(user.stats.xpEarned / (user.stats.xpEarned + user.stats.xpToNextLevel)) * 100} 
                className="h-2 w-24 animate-progress" 
              />
              <span className="text-xs text-muted-foreground">{user.stats.xpEarned} XP</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Daily goal indicator */}
      <div className="mt-4 flex items-center gap-2">
        <CoffeeIcon className="h-4 w-4 text-primary" />
        <span className="text-sm">Today's goal: {user.preferences.dailyGoalHours} hours of coding</span>
        <Progress value={25} className="h-2 w-24" />
        <span className="text-xs text-muted-foreground">1h / {user.preferences.dailyGoalHours}h</span>
      </div>
    </div>
  );
}
