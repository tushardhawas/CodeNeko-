import { useState, useEffect, useRef, useMemo } from 'react';
import { ClockIcon, TrophyIcon, ActivityIcon } from 'lucide-react';
import { useUser } from '@/lib/user-provider';
import { useTheme } from '@/lib/theme-provider';
import { StreakCalendar } from '@/components/dashboard/StreakCalendar';
import { 
  GlobalSpotlight, 
  ThemeStyles, 
  getThemeColors, 
  DEFAULT_SPOTLIGHT_RADIUS,
  MOBILE_BREAKPOINT 
} from '@/components/dashboard/MagicBento';
import {
  StatsCard,
  CatStatusCard,
  RecentProjectsCard,
  LanguageDistributionCard,
  QuickActionsCard
} from '@/components/dashboard/cards';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { useDashboardAnimations } from '@/hooks/useDashboardAnimations';

export default function Dashboard() {
  const { user, isLoading } = useUser();
  const { theme } = useTheme();
  const statsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  // MagicBento settings
  const [isMobile, setIsMobile] = useState(false);
  const themeColors = useMemo(() => getThemeColors(theme), [theme]);
  const shouldDisableAnimations = isMobile;

  // Mobile detection
  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Use dashboard animations hook
  useDashboardAnimations(
    isLoading,
    user,
    statsRef as React.RefObject<HTMLDivElement>,
    projectsRef as React.RefObject<HTMLDivElement>,
    socialRef as React.RefObject<HTMLDivElement>
  );

  if (isLoading) {
    return <div className="flex h-[60vh] items-center justify-center">Loading your personalized dashboard...</div>;
  }

  if (!user) {
    return <div>Could not load user data</div>;
  }

  return (
    <>
      <ThemeStyles theme={theme} />

      <GlobalSpotlight
        gridRef={gridRef}
        disableAnimations={shouldDisableAnimations}
        enabled={true}
        spotlightRadius={DEFAULT_SPOTLIGHT_RADIUS}
        glowColor={themeColors.glowColor}
        glowIntensity={themeColors.glowIntensity}
      />

      <div className="space-y-4">
        {/* Header with greeting */}
        <DashboardHeader userName={user.name} />

        {/* Streak Calendar - Featured at the top */}
        <div className="mb-8">
          <StreakCalendar />
        </div>

        {/* Main Stats Row - Key metrics */}
        <div 
          className="bento-section grid gap-4 mb-8 max-w-[80rem] select-none relative"
          style={{ fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.5rem)" }}
          ref={gridRef}
        >
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" ref={statsRef}>
            {/* Coding Time Card */}
            <StatsCard
              icon={ClockIcon}
              label="Coding Time"
              value={user.stats.totalCodingTime}
              description="Total time spent coding"
              themeColors={themeColors}
              shouldDisableAnimations={shouldDisableAnimations}
            />

            {/* Streak Card */}
            <StatsCard
              icon={TrophyIcon}
              label="Streak"
              value={`${user.stats.currentStreak} days`}
              description="Current coding streak"
              themeColors={themeColors}
              shouldDisableAnimations={shouldDisableAnimations}
            />

            {/* Performance Card */}
            <StatsCard
              icon={ActivityIcon}
              label="Performance"
              value="85%"
              description="Weekly performance"
              themeColors={themeColors}
              shouldDisableAnimations={shouldDisableAnimations}
            />

            {/* Cat Status Card */}
            <CatStatusCard
              themeColors={themeColors}
              shouldDisableAnimations={shouldDisableAnimations}
            />
          </div>
        </div>

        {/* Secondary Content Grid - Projects, Languages, Actions */}
        <div className="bento-section grid gap-4 max-w-[80rem] select-none relative">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
            {/* Recent Projects Card - Larger */}
            <RecentProjectsCard
              ref={projectsRef}
              projects={user.recentProjects}
              themeColors={themeColors}
              shouldDisableAnimations={shouldDisableAnimations}
            />

            {/* Right Column - Languages & Actions */}
            <div className="space-y-4">
              {/* Language Distribution Card */}
              <LanguageDistributionCard
                languages={user.languageDistribution}
                themeColors={themeColors}
                shouldDisableAnimations={shouldDisableAnimations}
              />

              {/* Quick Actions Card */}
              <QuickActionsCard
                themeColors={themeColors}
                shouldDisableAnimations={shouldDisableAnimations}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}