import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useTheme } from '../../lib/theme-provider';
import {
  BarChart3Icon,
  ClockIcon,
  FolderIcon,
  HomeIcon,
  SettingsIcon,
  TrophyIcon,
  CatIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MenuIcon,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import catMascotLight from '../../assets/cat-mascot-enhanced.svg';
import catMascotDark from '../../assets/cat-mascot-dark.svg';

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    href: '/app',
    icon: HomeIcon,
  },
  {
    title: 'Coding Stats',
    href: '/app/stats',
    icon: BarChart3Icon,
  },
  {
    title: 'Time Tracker',
    href: '/app/tracker',
    icon: ClockIcon,
  },
  {
    title: 'Projects',
    href: '/app/projects',
    icon: FolderIcon,
  },
  {
    title: 'Leaderboard',
    href: '/app/leaderboard',
    icon: TrophyIcon,
  },
  {
    title: 'Cat Companion',
    href: '/app/cat',
    icon: CatIcon,
  },
  {
    title: 'Settings',
    href: '/app/settings',
    icon: SettingsIcon,
  },
];

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function DashboardSidebar({ collapsed, onToggle }: DashboardSidebarProps) {
  const { theme } = useTheme();
  const location = useLocation();
  const catMascot = theme === 'dark' ? catMascotDark : catMascotLight;

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex flex-col border-r border-border/40 bg-sidebar transition-all duration-300 ease-in-out md:relative",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-border/40 px-4">
        <Link to="/" className="flex items-center gap-2 overflow-hidden">
          <img src={catMascot} alt="CodeNeko" className="h-8 w-8 flex-shrink-0" />
          {!collapsed && <span className="text-lg font-bold text-sidebar-foreground whitespace-nowrap">CodeNeko</span>}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-sidebar-foreground hover:bg-sidebar-accent/20"
        >
          {collapsed ? <ChevronRightIcon className="h-4 w-4" /> : <ChevronLeftIcon className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 overflow-auto py-4">
        <ul className="space-y-1 px-2">
          {sidebarItems.map((item) => (
            <li key={item.href}>
              {collapsed ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.href}
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-md transition-colors mx-auto',
                          location.pathname === item.href
                            ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                            : 'text-sidebar-foreground hover:bg-sidebar-accent/20 hover:text-sidebar-primary'
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <Link
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    location.pathname === item.href
                      ? 'bg-sidebar-primary/20 text-sidebar-primary'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/10 hover:text-sidebar-primary'
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{item.title}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {!collapsed && (
        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-md bg-sidebar-primary/10 p-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-primary/20">
              <CatIcon className="h-4 w-4 text-sidebar-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-sidebar-foreground">Coding Streak</p>
              <p className="text-sm text-sidebar-primary">5 days</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
