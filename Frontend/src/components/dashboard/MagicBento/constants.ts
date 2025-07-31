// MagicBento constants
export const DEFAULT_PARTICLE_COUNT = 12;
export const DEFAULT_SPOTLIGHT_RADIUS = 300;
export const MOBILE_BREAKPOINT = 768;

// Theme-aware glow colors
export const getThemeColors = (theme: 'light' | 'dark') => ({
  glowColor: theme === 'dark' ? "132, 0, 255" : "132, 0, 255", // Purple for both, but different intensities
  glowIntensity: theme === 'dark' ? 1 : 0.6, // More subtle in light mode
  backgroundColor: theme === 'dark' ? "#060010" : "hsl(var(--card))",
  borderColor: theme === 'dark' ? "#392e4e" : "hsl(var(--border))",
  textColor: theme === 'dark' ? "white" : "hsl(var(--foreground))",
});