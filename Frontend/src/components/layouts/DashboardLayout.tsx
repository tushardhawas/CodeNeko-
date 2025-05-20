import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/lib/theme-provider';
import { UserProvider } from '@/lib/user-provider';
import { DashboardSidebar } from '@/components/navigation/DashboardSidebar';
import { DashboardHeader } from '@/components/navigation/DashboardHeader';
import '@/styles/dashboard-animations.css';

export function DashboardLayout() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="codeneko-theme">
      <UserProvider>
        <div className="flex min-h-screen">
          <DashboardSidebar />
          <div className="flex flex-1 flex-col">
            <DashboardHeader />
            <main className="flex-1 p-6">
              <Outlet />
            </main>
          </div>
        </div>
      </UserProvider>
    </ThemeProvider>
  );
}
