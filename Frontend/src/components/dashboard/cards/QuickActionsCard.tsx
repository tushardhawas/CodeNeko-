import { memo } from 'react';
import { ZapIcon, ClockIcon, FolderIcon, BarChart3Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ParticleCard } from '../MagicBento';
import { useNavigate } from 'react-router-dom';

interface QuickActionsCardProps {
  themeColors: {
    glowColor: string;
    glowIntensity: number;
  };
  shouldDisableAnimations: boolean;
}

export const QuickActionsCard = memo<QuickActionsCardProps>(({
  themeColors,
  shouldDisableAnimations
}) => {
  const navigate = useNavigate();

  return (
    <ParticleCard
      className="magic-card magic-card--border-glow flex flex-col justify-between relative min-h-[180px] w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5 bg-card text-card-foreground border-border"
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
      <div className="card__header flex justify-between gap-3 relative mb-3">
        <span className="card__label text-base flex items-center gap-2">
          <ZapIcon className="h-4 w-4" />
          Quick Actions
        </span>
      </div>
      <div className="card__content flex flex-col relative">
        <div className="grid grid-cols-1 gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-10 text-sm justify-start" 
            onClick={() => navigate('/app/tracker')}
          >
            <ClockIcon className="h-4 w-4 mr-2" />
            Start Timer
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-10 text-sm justify-start" 
            onClick={() => navigate('/app/projects')}
          >
            <FolderIcon className="h-4 w-4 mr-2" />
            New Project
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-10 text-sm justify-start" 
            onClick={() => navigate('/app/stats')}
          >
            <BarChart3Icon className="h-4 w-4 mr-2" />
            View Stats
          </Button>
        </div>
      </div>
    </ParticleCard>
  );
});

QuickActionsCard.displayName = 'QuickActionsCard';