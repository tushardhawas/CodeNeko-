import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  BarChart3Icon,
  ClockIcon,
  FolderIcon,
  HomeIcon,
  SettingsIcon,
  TrophyIcon,
  CatIcon,
  MoreHorizontalIcon,
  PlusIcon
} from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationItem {
  title: string;
  href: string;
  icon: React.ElementType;
  primary?: boolean;
}

const navigationItems: NavigationItem[] = [
  {
    title: 'Dashboard',
    href: '/app',
    icon: HomeIcon,
    primary: true
  },
  {
    title: 'Stats',
    href: '/app/stats',
    icon: BarChart3Icon,
    primary: true
  },
  {
    title: 'Tracker',
    href: '/app/tracker',
    icon: ClockIcon,
    primary: true
  },
  {
    title: 'Projects',
    href: '/app/projects',
    icon: FolderIcon,
    primary: true
  },
  {
    title: 'Leaderboard',
    href: '/app/leaderboard',
    icon: TrophyIcon
  },
  {
    title: 'Cat',
    href: '/app/cat',
    icon: CatIcon
  },
  {
    title: 'Settings',
    href: '/app/settings',
    icon: SettingsIcon
  },
];

interface DashboardNavigationProps {
  setActiveOption: (index: number) => void;
}

export function DashboardNavigation({ setActiveOption }: DashboardNavigationProps) {
  const location = useLocation();
  const [showFAB, setShowFAB] = useState(false);
  
  // Filter primary items for main navigation
  const primaryItems = navigationItems.filter(item => item.primary);
  // Filter secondary items for dropdown
  const secondaryItems = navigationItems.filter(item => !item.primary);

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-around px-2">
          {primaryItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex flex-col items-center justify-center rounded-md px-3 py-2 text-xs transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary'
                )}
                onClick={() => setActiveOption(index)}
              >
                <item.icon className={cn(
                  'h-5 w-5 mb-1',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )} />
                <span>{item.title}</span>
              </Link>
            );
          })}
          
          {/* More Menu Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="flex flex-col items-center justify-center h-auto px-3 py-2">
                <MoreHorizontalIcon className="h-5 w-5 mb-1 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {secondaryItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link to={item.href} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      
      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4 z-50">
        <AnimatePresence>
          {showFAB && (
            <motion.div 
              className="absolute bottom-16 right-0 flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              {secondaryItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
                >
                  <item.icon className="h-5 w-5" />
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        <Button 
          size="icon" 
          className="h-12 w-12 rounded-full shadow-lg"
          onClick={() => setShowFAB(!showFAB)}
        >
          <PlusIcon className="h-6 w-6" />
        </Button>
      </div>
    </>
  );
}
