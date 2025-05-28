import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/lib/theme-provider';
import { UserProvider } from '@/lib/user-provider';
import { DashboardHeader } from '@/components/navigation/DashboardHeader';
import { CodeNekoNavRing } from '@/components/navigation/CodeNekoNavRing';
import '@/styles/dashboard-animations.css';

export function DashboardLayout() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="codeneko-theme">
      <UserProvider>
        <div className="flex min-h-screen flex-col bg-background">
          <DashboardHeader />
          <main className="flex-1 p-4 md:p-6 transition-all duration-300">
            <Outlet />
          </main>
          <CodeNekoNavRing />
        </div>
      </UserProvider>
    </ThemeProvider>
  );
}
