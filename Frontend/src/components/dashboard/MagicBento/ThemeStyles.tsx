import { memo } from 'react';
import { getThemeColors } from './constants';

interface ThemeStylesProps {
  theme: 'light' | 'dark';
}

export const ThemeStyles = memo<ThemeStylesProps>(({ theme }) => {
  const themeColors = getThemeColors(theme);

  return (
    <style>
      {`
        .bento-section {
          --glow-x: 50%;
          --glow-y: 50%;
          --glow-intensity: 0;
          --glow-radius: 200px;
          --glow-color: ${themeColors.glowColor};
          --border-color: ${themeColors.borderColor};
          --background-card: ${themeColors.backgroundColor};
          --text-color: ${themeColors.textColor};
          --purple-primary: rgba(${themeColors.glowColor}, ${themeColors.glowIntensity});
          --purple-glow: rgba(${themeColors.glowColor}, ${themeColors.glowIntensity * 0.2});
          --purple-border: rgba(${themeColors.glowColor}, ${themeColors.glowIntensity * 0.8});
          transition: all 0.3s ease;
        }
        
        .magic-card--border-glow::after {
          content: '';
          position: absolute;
          inset: 0;
          padding: 6px;
          background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
              rgba(${themeColors.glowColor}, calc(var(--glow-intensity) * ${themeColors.glowIntensity} * 0.8)) 0%,
              rgba(${themeColors.glowColor}, calc(var(--glow-intensity) * ${themeColors.glowIntensity} * 0.4)) 30%,
              transparent 60%);
          border-radius: inherit;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: subtract;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          pointer-events: none;
          transition: opacity 0.3s ease;
          z-index: 1;
        }
        
        .magic-card--border-glow:hover::after {
          opacity: 1;
        }
        
        .magic-card--border-glow:hover {
          box-shadow: 0 4px 20px ${theme === 'dark' ? 'rgba(46, 24, 78, 0.4)' : 'rgba(0, 0, 0, 0.1)'}, 0 0 30px rgba(${themeColors.glowColor}, ${themeColors.glowIntensity * 0.2});
          transition: box-shadow 0.3s ease;
        }
        
        .magic-card--border-glow {
          transition: all 0.3s ease;
        }
        
        .particle::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: rgba(${themeColors.glowColor}, ${themeColors.glowIntensity * 0.2});
          border-radius: 50%;
          z-index: -1;
        }
        
        .text-clamp-1 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .text-clamp-2 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Optimize theme transitions */
        * {
          transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
        }

        .global-spotlight {
          transition: opacity 0.3s ease !important;
        }
      `}
    </style>
  );
});

ThemeStyles.displayName = 'ThemeStyles';