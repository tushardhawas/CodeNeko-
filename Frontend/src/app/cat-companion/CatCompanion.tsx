import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useTheme } from '@/lib/theme-provider';
import catMascotLight from '@/assets/cat-mascot-enhanced.svg';
import catMascotDark from '@/assets/cat-mascot-dark.svg';

const catMessages = [
  "Meow! Keep up the good work!",
  "You're doing great! Take a short break every hour.",
  "Remember to commit your changes regularly!",
  "Have you tried that new VS Code extension?",
  "Your coding streak is impressive!",
  "Don't forget to document your code!",
  "Purr... Your code looks clean and organized.",
  "Time for a quick stretch? Cats always stretch!",
  "You've been coding for 2 hours straight. Maybe grab some water?",
  "Your TypeScript skills are improving every day!"
];

export default function CatCompanion() {
  const { theme } = useTheme();
  const catMascot = theme === 'dark' ? catMascotDark : catMascotLight;
  const [message, setMessage] = useState(catMessages[0]);
  const [level, setLevel] = useState(2);
  const [xp, setXp] = useState(350);
  const [maxXp, setMaxXp] = useState(500);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleInteract = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setMessage(catMessages[Math.floor(Math.random() * catMessages.length)]);
      
      // Add some XP
      const newXp = xp + 25;
      if (newXp >= maxXp) {
        setLevel(level + 1);
        setXp(newXp - maxXp);
        setMaxXp(maxXp + 250);
      } else {
        setXp(newXp);
      }
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cat Companion</h1>
        <p className="text-muted-foreground">Your coding buddy who helps you stay motivated!</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Your Companion</CardTitle>
            <CardDescription>Level {level} Coding Cat</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div 
              className={`relative mb-4 h-48 w-48 cursor-pointer transition-transform ${
                isAnimating ? 'animate-bounce-slow' : 'hover:scale-110'
              }`}
              onClick={handleInteract}
            >
              <img
                src={catMascot}
                alt="CodeNeko Mascot"
                className="h-full w-full"
              />
            </div>
            
            <div className="mb-4 w-full space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">XP: {xp}/{maxXp}</span>
                <span className="text-sm">Level {level}</span>
              </div>
              <Progress value={(xp / maxXp) * 100} />
            </div>
            
            <div className="relative mb-4 w-full rounded-lg bg-card p-4 shadow-sm">
              <p className="text-center">{message}</p>
              <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-card"></div>
            </div>
            
            <Button onClick={handleInteract}>Interact with Cat</Button>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Cat Evolution</CardTitle>
            <CardDescription>Your cat grows as you code more!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-lg">🐱</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Kitten</p>
                  <p className="text-sm text-muted-foreground">Level 1-3</p>
                  <div className="mt-1 h-2 w-full rounded-full bg-primary/10">
                    <div className="h-full w-full rounded-full bg-primary"></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-lg">😺</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Coding Cat</p>
                  <p className="text-sm text-muted-foreground">Level 4-7</p>
                  <div className="mt-1 h-2 w-full rounded-full bg-primary/10">
                    <div className="h-full w-[50%] rounded-full bg-primary"></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-lg">🐱‍👤</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Ninja Neko</p>
                  <p className="text-sm text-muted-foreground">Level 8-12</p>
                  <div className="mt-1 h-2 w-full rounded-full bg-primary/10">
                    <div className="h-full w-[10%] rounded-full bg-primary"></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-lg">🐱‍🏍</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Tech Sage</p>
                  <p className="text-sm text-muted-foreground">Level 13+</p>
                  <div className="mt-1 h-2 w-full rounded-full bg-primary/10">
                    <div className="h-full w-[0%] rounded-full bg-primary"></div>
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
