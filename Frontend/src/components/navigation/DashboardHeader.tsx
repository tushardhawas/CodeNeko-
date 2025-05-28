import { Link } from 'react-router-dom';
import { BellIcon, SearchIcon, TrophyIcon, MenuIcon, BarChart3Icon, ClockIcon, FolderIcon, SettingsIcon, CatIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/lib/user-provider';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/theme-provider';
import catMascotLight from '@/assets/cat-mascot-enhanced.svg';
import catMascotDark from '@/assets/cat-mascot-dark.svg';

export function DashboardHeader() {
  const { user, isLoading } = useUser();
  const { theme } = useTheme();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationCount] = useState(3);

  const catMascot = theme === 'dark' ? catMascotDark : catMascotLight;

  // Animate notification badge when it appears
  useEffect(() => {
    if (showNotification) {
      const badge = document.querySelector('.notification-badge');
      if (badge && badge instanceof HTMLElement) {
        badge.animate(
          [
            { transform: 'scale(0)' },
            { transform: 'scale(1.2)' },
            { transform: 'scale(1)' }
          ],
          {
            duration: 400,
            easing: 'ease-out'
          }
        );
      }
    }
  }, [showNotification]);

  // Show notification after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);



  return (
    <header className="sticky top-0 z-10 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link to="/app" className="flex items-center gap-2">
            <img src={catMascot} alt="CodeNeko" className="h-8 w-8" />
            <span className="text-lg font-bold hidden md:inline-block">CodeNeko</span>
          </Link>

          {!isLoading && user && (
            <div className="hidden items-center gap-2 md:flex">
              <Badge variant="outline" className="bg-primary/5 text-primary">
                <TrophyIcon className="mr-1 h-3 w-3" /> {user.stats.currentStreak} day streak
              </Badge>
            </div>
          )}
        </div>

        <div className="flex-1 max-w-md mx-auto px-4">
          <form className="w-full">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search projects, languages, stats..."
                className="w-full rounded-md border border-input bg-background pl-8 pr-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </form>
        </div>

        <div className="flex items-center gap-3">
          {/* Navigation Menu Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Navigation Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>Navigation</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/app/stats" className="flex items-center gap-2 w-full">
                  <BarChart3Icon className="h-4 w-4" />
                  Stats
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/app/tracker" className="flex items-center gap-2 w-full">
                  <ClockIcon className="h-4 w-4" />
                  Tracker
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/app/projects" className="flex items-center gap-2 w-full">
                  <FolderIcon className="h-4 w-4" />
                  Projects
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/app/leaderboard" className="flex items-center gap-2 w-full">
                  <TrophyIcon className="h-4 w-4" />
                  Leaderboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/app/cat" className="flex items-center gap-2 w-full">
                  <CatIcon className="h-4 w-4" />
                  Cat Companion
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/app/settings" className="flex items-center gap-2 w-full">
                  <SettingsIcon className="h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="relative">
            <BellIcon className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
            {showNotification && (
              <span className="notification-badge absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {notificationCount}
              </span>
            )}
          </Button>

          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  {!isLoading && user && user.avatar && (
                    <AvatarImage src={user.avatar} alt={user.name} />
                  )}
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {!isLoading && user ? user.name.charAt(0) : 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {!isLoading && user ? user.name : 'Loading...'}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {!isLoading && user ? user.email : ''}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/app/settings" className="w-full">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/app/settings/preferences" className="w-full">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
