import { memo, forwardRef } from 'react';
import { FolderIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ParticleCard } from '../MagicBento';
import { useNavigate } from 'react-router-dom';

interface Project {
  name: string;
  time: string;
  percentage: number;
}

interface RecentProjectsCardProps {
  projects: Project[];
  themeColors: {
    glowColor: string;
    glowIntensity: number;
  };
  shouldDisableAnimations: boolean;
}

export const RecentProjectsCard = memo(forwardRef<HTMLDivElement, RecentProjectsCardProps>(({
  projects,
  themeColors,
  shouldDisableAnimations
}, ref) => {
  const navigate = useNavigate();

  return (
    <ParticleCard
      className="magic-card magic-card--border-glow flex flex-col justify-between relative min-h-[280px] w-full max-w-full p-6 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5 lg:col-span-2 bg-card text-card-foreground border-border"
      style={{
        "--glow-x": "50%",
        "--glow-y": "50%",
        "--glow-intensity": "0",
        "--glow-radius": "200px",
      } as React.CSSProperties}
      disableAnimations={shouldDisableAnimations}
      particleCount={12}
      glowColor={themeColors.glowColor}
      glowIntensity={themeColors.glowIntensity}
      enableTilt={true}
      clickEffect={true}
      enableMagnetism={true}
    >
      <div className="card__header flex justify-between gap-3 relative mb-4">
        <span className="card__label text-lg flex items-center gap-2">
          <FolderIcon className="h-5 w-5" />
          Recent Projects
        </span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs opacity-70 hover:opacity-100 hover:bg-muted"
          onClick={() => navigate('/app/projects')}
        >
          View All
        </Button>
      </div>
      <div className="card__content flex flex-col relative flex-1">
        <div ref={ref} className="space-y-4">
          {projects.slice(0, 4).map((project, index) => (
            <div key={index} className="project-item flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                <FolderIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">{project.name}</p>
                  <p className="text-xs opacity-70">{project.time}</p>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="progress-bar h-full w-0 rounded-full bg-primary"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ParticleCard>
  );
}));

RecentProjectsCard.displayName = 'RecentProjectsCard';