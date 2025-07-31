import { memo } from 'react';
import { CatIcon } from 'lucide-react';
import { ParticleCard } from '../MagicBento';

interface CatStatusCardProps {
  themeColors: {
    glowColor: string;
    glowIntensity: number;
  };
  shouldDisableAnimations: boolean;
}

export const CatStatusCard = memo<CatStatusCardProps>(({
  themeColors,
  shouldDisableAnimations
}) => {
  return (
    <ParticleCard
      className="magic-card magic-card--border-glow flex flex-col justify-between relative aspect-[4/3] min-h-[160px] w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5 bg-card text-card-foreground border-border"
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
      <div className="card__header flex justify-between gap-3 relative">
        <span className="card__label text-sm flex items-center gap-2">
          <CatIcon className="h-4 w-4" />
          Cat Status
        </span>
      </div>
      <div className="card__content flex flex-col relative text-center">
        <div className="text-3xl mb-2">😸</div>
        <h3 className="card__title font-normal text-lg m-0 mb-1">Happy</h3>
        <p className="card__description text-xs leading-4 opacity-90">
          Your cat is pleased!
        </p>
      </div>
    </ParticleCard>
  );
});

CatStatusCard.displayName = 'CatStatusCard';