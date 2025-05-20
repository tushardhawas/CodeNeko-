import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/lib/theme-provider';
import { DashboardSidebar } from '@/components/navigation/DashboardSidebar';
import { DashboardHeader } from '@/components/navigation/DashboardHeader';

export function DashboardLayout() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="codeneko-theme">
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
