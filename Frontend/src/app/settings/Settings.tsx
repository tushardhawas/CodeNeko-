import { Outlet } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { UserIcon, BellIcon, SettingsIcon, KeyIcon } from 'lucide-react';

interface SettingsNavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const settingsNavItems: SettingsNavItem[] = [
  {
    title: 'Profile',
    href: '/app/settings',
    icon: UserIcon,
  },
  {
    title: 'Preferences',
    href: '/app/settings/preferences',
    icon: SettingsIcon,
  },
  {
    title: 'Notifications',
    href: '/app/settings/notifications',
    icon: BellIcon,
  },
  {
    title: 'Security',
    href: '/app/settings/security',
    icon: KeyIcon,
  },
];

export default function Settings() {
  const location = useLocation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
        <aside className="lg:w-1/5">
          <Card>
            <CardContent className="p-0">
              <nav className="flex flex-col space-y-1 p-2">
                {settingsNavItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </aside>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
