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
} from 'lucide-react';
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

export function DashboardSidebar() {
  const { theme } = useTheme();
  const location = useLocation();
  const catMascot = theme === 'dark' ? catMascotDark : catMascotLight;

  return (
    <aside className="hidden w-64 flex-col border-r border-border/40 bg-card md:flex">
      <div className="flex h-16 items-center border-b border-border/40 px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={catMascot} alt="CodeNeko" className="h-8 w-8" />
          <span className="text-lg font-bold">CodeNeko</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-auto py-6">
        <ul className="space-y-1 px-4">
          {sidebarItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  location.pathname === item.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t border-border/40 p-4">
        <div className="flex items-center gap-3 rounded-md bg-primary/5 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
            <CatIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs font-medium">Coding Streak</p>
            <p className="text-sm text-primary">5 days</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
