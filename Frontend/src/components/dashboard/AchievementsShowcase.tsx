import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  StarIcon,
  SunriseIcon,
  MoonIcon,
  CodeIcon,
  CoffeeIcon,
  ZapIcon,
  TrophyIcon,
  HeartIcon,
  FlameIcon,
  Brain
} from 'lucide-react';
import { useUser } from '@/lib/user-provider';
import { animate, stagger } from 'motion';
import type { Achievement } from '@/lib/user-provider';

interface AchievementsShowcaseProps {
  limit?: number;
  showUnlocked?: boolean;
  interactive?: boolean;
}

export function AchievementsShowcase({
  limit = 6,
  showUnlocked = true,
  interactive = true
}: AchievementsShowcaseProps) {
  const { user, isLoading } = useUser();
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const achievementsRef = useRef<HTMLDivElement>(null);

  // Additional achievements not in the user profile
  const additionalAchievements: Achievement[] = [
    {
      id: '4',
      title: 'Coffee Addict',
      description: 'Code for 10 hours in a single day',
      icon: 'coffee',
      earned: false,
    },
    {
      id: '5',
      title: 'Speed Demon',
      description: 'Complete a project 2 days ahead of schedule',
      icon: 'zap',
      earned: false,
    },
    {
      id: '6',
      title: 'Polyglot',
      description: 'Use 5 different programming languages in a week',
      icon: 'code',
      earned: false,
    },
    {
      id: '7',
      title: 'Consistent Coder',
      description: 'Code for at least 2 hours every day for 2 weeks',
      icon: 'flame',
      earned: false,
    },
    {
      id: '8',
      title: 'Bug Hunter',
      description: 'Fix 10 bugs in a single day',
      icon: 'brain',
      earned: false,
    },
  ];

  // Animation effect when component mounts
  useEffect(() => {
    if (!isLoading && achievementsRef.current) {
      // Animate achievement items with staggered effect
      const achievementItems = Array.from(achievementsRef.current.querySelectorAll('.achievement-item'));
      animate(
        achievementItems,
        { opacity: [0, 1], scale: [0.9, 1] },
        { duration: 0.5, delay: stagger(0.1) }
      );
    }
  }, [isLoading]);

  // Create confetti effect
  const createConfetti = () => {
    setShowConfetti(true);

    // Create confetti elements
    const confettiContainer = document.getElementById('confetti-container');
    if (confettiContainer) {
      // Clear previous confetti
      confettiContainer.innerHTML = '';

      // Create new confetti pieces
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti confetti-animation';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 0.5}s`;
        confetti.style.backgroundColor = getRandomColor();
        confettiContainer.appendChild(confetti);
      }

      // Remove confetti after animation
      setTimeout(() => {
        setShowConfetti(false);
      }, 2000);
    }
  };

  // Get random color for confetti
  const getRandomColor = () => {
    const colors = ['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41', '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Handle achievement click
  const handleAchievementClick = (achievement: Achievement) => {
    if (interactive) {
      setSelectedAchievement(achievement);

      if (achievement.earned) {
        createConfetti();
      }
    }
  };

  // Get icon component based on icon name
  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case 'sunrise':
        return <SunriseIcon className="h-6 w-6 text-primary" />;
      case 'moon':
        return <MoonIcon className="h-6 w-6 text-primary" />;
      case 'code':
        return <CodeIcon className="h-6 w-6 text-primary" />;
      case 'coffee':
        return <CoffeeIcon className="h-6 w-6 text-primary" />;
      case 'zap':
        return <ZapIcon className="h-6 w-6 text-primary" />;
      case 'trophy':
        return <TrophyIcon className="h-6 w-6 text-primary" />;
      case 'heart':
        return <HeartIcon className="h-6 w-6 text-primary" />;
      case 'flame':
        return <FlameIcon className="h-6 w-6 text-primary" />;
      case 'brain':
        return <Brain className="h-6 w-6 text-primary" />;
      default:
        return <StarIcon className="h-6 w-6 text-primary" />;
    }
  };

  if (isLoading) {
    return <div className="h-60 animate-pulse rounded-lg bg-muted"></div>;
  }

  if (!user) {
    return <div>Could not load user data</div>;
  }

  // Combine user achievements with additional ones
  const allAchievements = [...user.stats.achievements, ...additionalAchievements];

  // Filter achievements based on showUnlocked prop
  const filteredAchievements = showUnlocked
    ? allAchievements
    : allAchievements.filter(a => a.earned);

  // Limit the number of achievements shown
  const displayedAchievements = filteredAchievements.slice(0, limit);

  return (
    <div className="relative">
      {/* Confetti container */}
      {interactive && (
        <div
          id="confetti-container"
          className={`pointer-events-none absolute inset-0 z-10 overflow-hidden ${
            showConfetti ? 'visible' : 'invisible'
          }`}
        ></div>
      )}

      <Card>
        <CardHeader className="bg-primary/5">
          <CardTitle className="flex items-center">
            <StarIcon className="mr-2 h-5 w-5 text-primary" />
            Your Achievements
          </CardTitle>
          <CardDescription>Badges and milestones you've earned</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div ref={achievementsRef} className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {displayedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`achievement-item flex cursor-pointer flex-col items-center rounded-lg border p-4 text-center transition-all duration-300 hover:shadow-md ${
                  achievement.earned ? 'bg-primary/5' : 'bg-muted/20 opacity-60'
                } ${selectedAchievement?.id === achievement.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => handleAchievementClick(achievement)}
              >
                <div className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full ${
                  achievement.earned ? 'bg-primary/20' : 'bg-muted/30'
                }`}>
                  {getAchievementIcon(achievement.icon)}
                </div>
                <h3 className="font-medium">{achievement.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{achievement.description}</p>
                {achievement.earned && achievement.date && (
                  <Badge variant="outline" className="mt-2 bg-primary/10 text-primary">
                    Earned {achievement.date}
                  </Badge>
                )}
              </div>
            ))}
          </div>

          {/* Selected achievement details */}
          {selectedAchievement && interactive && (
            <div className="mt-6 rounded-lg border bg-card p-4">
              <div className="flex items-start gap-4">
                <div className={`flex h-16 w-16 items-center justify-center rounded-full ${
                  selectedAchievement.earned ? 'bg-primary/20' : 'bg-muted/30'
                }`}>
                  {getAchievementIcon(selectedAchievement.icon)}
                </div>
                <div>
                  <h3 className="text-lg font-medium">{selectedAchievement.title}</h3>
                  <p className="text-muted-foreground">{selectedAchievement.description}</p>
                  {selectedAchievement.earned && selectedAchievement.date ? (
                    <p className="mt-2 text-sm">
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        Earned on {selectedAchievement.date}
                      </Badge>
                    </p>
                  ) : (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Keep coding to unlock this achievement!
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t bg-muted/20 px-6 py-3">
          <Button variant="ghost" size="sm" className="ml-auto">View All Achievements</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
