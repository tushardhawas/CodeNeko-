import { useMemo, useRef, useCallback, useEffect, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-provider";
import { gsap } from "gsap";

// MagicBento constants
const DEFAULT_PARTICLE_COUNT = 8;
const MOBILE_BREAKPOINT = 768;

// Theme-aware glow colors
const getThemeColors = (theme: "light" | "dark") => ({
  glowColor: "132, 0, 255", // Purple for both themes
  glowIntensity: theme === "dark" ? 1 : 0.6, // More subtle in light mode
  backgroundColor: theme === "dark" ? "#060010" : "hsl(var(--card))",
  borderColor: theme === "dark" ? "#392e4e" : "hsl(var(--border))",
  textColor: theme === "dark" ? "white" : "hsl(var(--foreground))",
});

// MagicBento helper functions
const createParticleElement = (
  x: number,
  y: number,
  color: string,
  intensity: number = 1
): HTMLDivElement => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(${color}, ${intensity});
    box-shadow: 0 0 4px rgba(${color}, ${intensity * 0.6});
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

interface StreakCalendarProps {
  className?: string;
}

interface Day {
  date: Date;
  intensity: number; // 0 = no activity, 1 = activity
}

// Generate last year data with random demo activity
const generateData = (): Day[] => {
  const today = new Date();
  const start = new Date(today);
  start.setFullYear(start.getFullYear() - 1);
  const days: Day[] = [];

  for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
    days.push({
      date: new Date(d),
      intensity: Math.random() < 0.3 ? 1 : 0,
    });
  }

  return days;
};


// ParticleCard component for MagicBento effects
const ParticleCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  glowIntensity?: number;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}> = ({
  children,
  className = "",
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = "132, 0, 255",
  glowIntensity = 1,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(
        Math.random() * width,
        Math.random() * height,
        glowColor,
        glowIntensity
      )
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor, glowIntensity]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        },
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(
          clone,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
        );

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 60,
          y: (Math.random() - 0.5) * 60,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(clone, {
          opacity: 0.4,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, index * 150);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 2,
          rotateY: 2,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.02;
        const magnetY = (y - centerY) * 0.02;

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, ${
        0.3 * glowIntensity
      }) 0%, rgba(${glowColor}, ${0.1 * glowIntensity}) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1,
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        }
      );
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("click", handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("click", handleClick);
      clearAllParticles();
    };
  }, [
    animateParticles,
    clearAllParticles,
    disableAnimations,
    enableTilt,
    enableMagnetism,
    clickEffect,
    glowColor,
    glowIntensity,
  ]);

  return (
    <div
      ref={cardRef}
      className={`${className} relative`}
      style={{ ...style, position: "relative" }}
    >
      {children}
    </div>
  );
};

export function StreakCalendar({ className }: StreakCalendarProps) {
  const { theme } = useTheme();
  const data = useMemo(generateData, []);
  const [isMobile, setIsMobile] = useState(false);
  const themeColors = getThemeColors(theme);
  const shouldDisableAnimations = isMobile;

  // Mobile detection
  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getMonthLabelWidth = (weeks: number, block = 0.75, gap = 0.375) =>
  `calc(${weeks} * ${block}rem + ${(weeks - 1)} * ${gap}rem)`;

  // Group data by month, each month as a group of week-columns, never split a month
  const createCalendarGrid = () => {
    if (data.length === 0) return { months: [] };

    // Group all days by year and month (never split a month)
    const monthMap = new Map<string, Day[]>();
    data.forEach((day) => {
      const key = `${day.date.getFullYear()}-${day.date.getMonth()}`;
      if (!monthMap.has(key)) monthMap.set(key, []);
      monthMap.get(key)!.push(day);
    });

    // Sort months chronologically and keep only the last 12 unique months
    const sortedKeys = Array.from(monthMap.keys()).sort((a, b) => {
      const [ay, am] = a.split("-").map(Number);
      const [by, bm] = b.split("-").map(Number);
      return ay !== by ? ay - by : am - bm;
    });

    // Only keep the last 12 unique months
    const last12Keys = sortedKeys.slice(-12);

    const months = last12Keys.map((key) => {
      const days = monthMap.get(key)!;
      const firstDate = days[0].date;
      const lastDate = days[days.length - 1].date;
      // Find the first Sunday before or on the 1st
      const start = new Date(firstDate);
      start.setDate(firstDate.getDate() - firstDate.getDay());
      // Find the last Saturday after or on the last day
      const end = new Date(lastDate);
      end.setDate(lastDate.getDate() + (6 - lastDate.getDay()));
      const weeks: (Day | null)[][] = [];
      let current = new Date(start);
      
      while (current <= end) {
        const week: (Day | null)[] = [];
        for (let d = 0; d < 7; d++) {
          const found = days.find(
            (day) => day.date.toDateString() === current.toDateString()
          );
          week.push(found ? found : null);
          current.setDate(current.getDate() + 1);
        }
        weeks.push(week);
      }
      return {
        label: firstDate.toLocaleString("en-US", { month: "short" }),
        year: firstDate.getFullYear(),
        weeks,
        firstDayOfMonth: firstDate.getDay(),
        lastDayOfMonth: lastDate.getDay(),
      };
    });

    return { months };
  };

  const { months } = useMemo(createCalendarGrid, [data]);

  const total = data.filter((d) => d.intensity > 0).length;
  const streak = useMemo(() => {
    let s = 7;
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].intensity > 0) s++;
      else break;
    }
    return s;
  }, [data]);

  return (
    <>
      <style>
        {`
          .streak-calendar-card {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 200px;
            --glow-color: ${themeColors.glowColor};
            --border-color: ${themeColors.borderColor};
            --background-card: ${themeColors.backgroundColor};
            --text-color: ${themeColors.textColor};
            --purple-primary: rgba(${themeColors.glowColor}, ${
          themeColors.glowIntensity
        });
            --purple-glow: rgba(${themeColors.glowColor}, ${
          themeColors.glowIntensity * 0.2
        });
            --purple-border: rgba(${themeColors.glowColor}, ${
          themeColors.glowIntensity * 0.8
        });
          }
          
          .streak-calendar-card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 6px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(${themeColors.glowColor}, calc(var(--glow-intensity) * ${
          themeColors.glowIntensity
        } * 0.6)) 0%,
                rgba(${themeColors.glowColor}, calc(var(--glow-intensity) * ${
          themeColors.glowIntensity
        } * 0.3)) 30%,
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
          
          .streak-calendar-card--border-glow:hover::after {
            opacity: 1;
          }
          
          .streak-calendar-card--border-glow:hover {
            box-shadow: 0 4px 20px ${
              theme === "dark" ? "rgba(46, 24, 78, 0.4)" : "rgba(0, 0, 0, 0.15)"
            }, 0 0 30px rgba(${themeColors.glowColor}, ${
          themeColors.glowIntensity * 0.2
        });
          }
          
          .calendar-day {
            transition: all 0.2s ease;
            position: relative;
            z-index: 1;
          }
          
          .calendar-day:hover {
            transform: scale(1.2);
            box-shadow: 0 0 8px rgba(${themeColors.glowColor}, ${
          themeColors.glowIntensity * 0.6
        });
            z-index: 10;
          }
          
          .calendar-day--active {
            background: linear-gradient(135deg, rgba(${
              themeColors.glowColor
            }, ${themeColors.glowIntensity * 0.8}), rgba(${
          themeColors.glowColor
        }, ${themeColors.glowIntensity * 0.6}));
            box-shadow: 0 0 4px rgba(${themeColors.glowColor}, ${
          themeColors.glowIntensity * 0.4
        });
          }
          
          .calendar-day--inactive {
            background: ${
              theme === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)"
            };
            border: 1px solid ${
              theme === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)"
            };
          }
          
          /* Ensure proper overflow handling */
          .overflow-x-auto {
            scrollbar-width: thin;
            scrollbar-color: rgba(${themeColors.glowColor}, 0.3) transparent;
          }
          
          .overflow-x-auto::-webkit-scrollbar {
            height: 4px;
          }
          
          .overflow-x-auto::-webkit-scrollbar-track {
            background: transparent;
          }
          
          .overflow-x-auto::-webkit-scrollbar-thumb {
            background: rgba(${themeColors.glowColor}, 0.3);
            border-radius: 2px;
          }
          
          .overflow-x-auto::-webkit-scrollbar-thumb:hover {
            background: rgba(${themeColors.glowColor}, 0.5);
          }

          /* Add .calendar-day--today CSS for fallback/outline */
          .calendar-day--today {
            outline: 2px solid #fff;
            outline-offset: 1px;
            position: relative;
          }
        `}
      </style>

      <ParticleCard
        className={cn(
          "streak-calendar-card streak-calendar-card--border-glow relative w-full p-6 rounded-[20px] border border-solid font-light transition-all duration-300 ease-in-out hover:-translate-y-0.5 bg-card text-card-foreground border-border",
          className
        )}
        style={
          {
            "--glow-x": "50%",
            "--glow-y": "50%",
            "--glow-intensity": "0",
            "--glow-radius": "200px",
            overflow: "visible",
          } as React.CSSProperties
        }
        disableAnimations={shouldDisableAnimations}
        particleCount={DEFAULT_PARTICLE_COUNT}
        glowColor={themeColors.glowColor}
        glowIntensity={themeColors.glowIntensity}
        enableTilt={true}
        clickEffect={true}
        enableMagnetism={true}
      >
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">Code Activity</h3>
            </div>
            <div className="text-sm opacity-70">
              {total} days ·{streak} streak {streak >= 7 && <span className="animate-pulse text-yellow-400">🔥</span>}
            </div>
          </div>
        </div>

        <div className="calendar-container">
          <div className="overflow-x-auto pb-2">
            {/* Month labels - center above each month block, perfectly aligned with grid */}
            <div className="flex mb-3 items-end min-w-max">
              {/* Day labels spacer: match width and gap of day labels column */}
              <div className="w-[18px] min-w-[18px] flex-shrink-0"></div>
              {months.map((month, idx) => (
                <div
                  key={`${month.label}-${month.year}`}
                  className="flex justify-center flex-shrink-0"
                  style={{
                    width: getMonthLabelWidth(month.weeks.length), // precise pixel math
                    marginLeft: idx > 0 ? "16px" : "0",
                  }}
                >
                  <span className="text-xs  opacity-60 font-medium text-center truncate">
                    {month.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Calendar container with proper sizing */}
            <div className="flex items-start min-w-max">
              {/* Day labels */}
              <div className="flex flex-col gap-1.5 pt-0 w-[18px] min-w-[18px] flex-shrink-0">
                <div className="text-xs opacity-50 flex items-center justify-center w-3 h-3">
                  S
                </div>
                <div className="text-xs opacity-50 flex items-center justify-center w-3 h-3">
                  M
                </div>
                <div className="text-xs opacity-50 flex items-center justify-center w-3 h-3">
                  T
                </div>
                <div className="text-xs opacity-50 flex items-center justify-center w-3 h-3">
                  W
                </div>
                <div className="text-xs opacity-50 flex items-center justify-center w-3 h-3">
                  T
                </div>
                <div className="text-xs opacity-50 flex items-center justify-center w-3 h-3">
                  F
                </div>
                <div className="text-xs opacity-50 flex items-center justify-center w-3 h-3">
                  S
                </div>
              </div>

              {/* Calendar months as groups of week-columns */}
              <div className="flex">
                {months.map((month, monthIdx) => (
                  <div
                    key={`${month.label}-${month.year}`}
                    className="flex gap-1.5 flex-shrink-0"
                    style={{ marginLeft: monthIdx > 0 ? "16px" : "0" }}
                  >
                    {month.weeks.map((week, weekIdx) => (
                      <div
                        key={`${month.label}-${weekIdx}`}
                        className="flex flex-col gap-1.5"
                      >
                        {week.map((day, dayIdx) => {
                          // Highlight today
                          const isToday = day && day.date.toDateString() === new Date().toDateString();
                          return (
                            <div
                              key={`${month.label}-${weekIdx}-${dayIdx}`}
                              className={cn(
                                "w-3 h-3 rounded-sm flex-shrink-0",
                                day
                                  ? day.intensity > 0
                                    ? "calendar-day calendar-day--active cursor-pointer"
                                    : "calendar-day calendar-day--inactive cursor-pointer"
                                  : "opacity-0",
                                isToday && "ring-1 ring-white/60 calendar-day--today"
                              )}
                              title={
                                day
                                  ? day.intensity > 0
                                    ? `${day.date.toLocaleDateString(
                                        "en-US"
                                      )}: 1 session`
                                    : `${day.date.toLocaleDateString(
                                        "en-US"
                                      )}: No activity`
                                  : undefined
                              }
                            >
                              {/* Today dot overlay */}
                              {isToday && (
                                <span
                                  style={{
                                    position: "absolute",
                                    left: "50%",
                                    top: "50%",
                                    transform: "translate(-50%, -50%)",
                                    width: "7px",
                                    height: "7px",
                                    borderRadius: "50%",
                                    background: theme === "dark" ? "#fff" : `rgba(${themeColors.glowColor}, 1)` ,
                                    boxShadow: theme === "dark"
                                      ? `0 0 6px 2px rgba(${themeColors.glowColor}, 0.7)`
                                      : `0 0 6px 2px rgba(${themeColors.glowColor}, 0.4)` ,
                                    border: theme === "dark" ? "1.5px solid #fff" : `1.5px solid rgba(${themeColors.glowColor}, 1)` ,
                                    zIndex: 20,
                                    pointerEvents: "none",
                                  }}
                                  aria-label="Today"
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between mt-4 text-xs opacity-60">
            <span>Less</span>
            <div className="flex items-center gap-1">
              <div className="calendar-day--inactive w-3 h-3 rounded-sm"></div>
              <div className="calendar-day--active w-3 h-3 rounded-sm opacity-30"></div>
              <div className="calendar-day--active w-3 h-3 rounded-sm opacity-60"></div>
              <div className="calendar-day--active w-3 h-3 rounded-sm opacity-90"></div>
              <div className="calendar-day--active w-3 h-3 rounded-sm"></div>
            </div>
            <span>More</span>
          </div>
        </div>
      </ParticleCard>
    </>
  );
}
