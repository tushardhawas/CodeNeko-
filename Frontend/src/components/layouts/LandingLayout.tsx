import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/lib/theme-provider';
import { Footer } from '@/components/sections/Footer';
import { LandingHeader } from '@/components/navigation/LandingHeader';

export function LandingLayout() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="codeneko-theme">
      <div className="flex min-h-screen flex-col">
        <LandingHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
