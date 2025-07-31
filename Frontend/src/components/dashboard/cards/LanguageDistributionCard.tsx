import { memo } from 'react';
import { CodeIcon } from 'lucide-react';
import { ParticleCard } from '../MagicBento';

interface Language {
  name: string;
  percentage: number;
}

interface LanguageDistributionCardProps {
  languages: Language[];
  themeColors: {
    glowColor: string;
    glowIntensity: number;
  };
  shouldDisableAnimations: boolean;
}

export const LanguageDistributionCard = memo<LanguageDistributionCardProps>(({
  languages,
  themeColors,
  shouldDisableAnimations
}) => {
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
          <CodeIcon className="h-4 w-4" />
          Languages
        </span>
      </div>
      <div className="card__content flex flex-col relative">
        <div className="space-y-3">
          {languages.slice(0, 3).map((lang, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm">{lang.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-1000"
                    style={{ width: `${lang.percentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium w-8 text-right">{lang.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ParticleCard>
  );
});

LanguageDistributionCard.displayName = 'LanguageDistributionCard';