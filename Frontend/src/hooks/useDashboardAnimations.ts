import { useEffect } from 'react';
import { animate, stagger } from 'motion';

interface User {
  recentProjects: Array<{ percentage: number }>;
}

export const useDashboardAnimations = (
  isLoading: boolean,
  user: User | null,
  statsRef: React.RefObject<HTMLDivElement>,
  projectsRef: React.RefObject<HTMLDivElement>,
  socialRef: React.RefObject<HTMLDivElement>
) => {
  useEffect(() => {
    if (isLoading) return;

    // Animate stats cards with staggered effect
    if (statsRef.current) {
      const statCards = Array.from(statsRef.current.children);
      animate(
        statCards,
        { opacity: [0, 1], y: [20, 0] },
        { duration: 0.5, delay: stagger(0.1) }
      );
    }

    // Animate project bars
    if (projectsRef.current && user) {
      const projectItems = Array.from(projectsRef.current.querySelectorAll('.project-item'));
      animate(
        projectItems,
        { opacity: [0, 1], x: [-20, 0] },
        { duration: 0.5, delay: stagger(0.1) }
      );

      // Animate progress bars
      const progressBars = Array.from(projectsRef.current.querySelectorAll('.progress-bar'));
      progressBars.forEach((bar, index) => {
        const width = user.recentProjects[index]?.percentage || 0;
        animate(
          bar as HTMLElement,
          { width: ['0%', `${width}%`] },
          { duration: 1, delay: 0.5 + (index * 0.2) }
        );
      });
    }

    // Animate social activity items
    if (socialRef.current) {
      const socialItems = Array.from(socialRef.current.querySelectorAll('.social-item'));
      animate(
        socialItems,
        { opacity: [0, 1], scale: [0.95, 1] },
        { duration: 0.5, delay: stagger(0.1) }
      );
    }
  }, [isLoading, user, statsRef, projectsRef, socialRef]);
};