import { memo } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ParticleCard } from '../MagicBento';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  description: string;
  themeColors: {
    glowColor: string;
    glowIntensity: number;
  };
  shouldDisableAnimations: boolean;
}

export const StatsCard = memo<StatsCardProps>(({
  icon: Icon,
  label,
  value,
  description,
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
          <Icon className="h-4 w-4" />
          {label}
        </span>
      </div>
      <div className="card__content flex flex-col relative">
        <h3 className="card__title font-normal text-2xl m-0 mb-1">
          {value}
        </h3>
        <p className="card__description text-xs leading-4 opacity-90">
          {description}
        </p>
      </div>
    </ParticleCard>
  );
});

StatsCard.displayName = 'StatsCard';