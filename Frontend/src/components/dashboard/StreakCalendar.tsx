import { useMemo, useRef, useCallback, useEffect, useState } from 'react';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';

// MagicBento constants
const DEFAULT_PARTICLE_COUNT = 8;
const DEFAULT_GLOW_COLOR = "132, 0, 255";
const MOBILE_BREAKPOINT = 768;

// MagicBento helper functions
const createParticleElement = (
  x: number,
  y: number,
  color: string = DEFAULT_GLOW_COLOR
): HTMLDivElement => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 4px rgba(${color}, 0.6);
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
    const hasWorked = Math.random() < 0.3; // ~30% days with activity
    days.push({ date: new Date(d), intensity: hasWorked ? 1 : 0 });
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
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}> = ({
  children,
  className = "",
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
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
        glowColor
      )
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

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
        background: radial-gradient(circle, rgba(${glowColor}, 0.3) 0%, rgba(${glowColor}, 0.1) 30%, transparent 70%);
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
  ]);

  return (
    <div
      ref={cardRef}
      className={`${className} relative overflow-hidden`}
      style={{ ...style, position: "relative", overflow: "hidden" }}
    >
      {children}
    </div>
  );
};

export function StreakCalendar({ className }: StreakCalendarProps) {
  const data = useMemo(generateData, []);
  const [isMobile, setIsMobile] = useState(false);
  const glowColor = DEFAULT_GLOW_COLOR;
  const shouldDisableAnimations = isMobile;

  // Mobile detection
  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // group into weeks
  const weeks: Day[][] = [];
  data.forEach((day) => {
    const weekIdx = Math.floor((day.date.getTime() - data[0].date.getTime()) / (1000 * 60 * 60 * 24 * 7));
    if (!weeks[weekIdx]) weeks[weekIdx] = [];
    weeks[weekIdx].push(day);
  });

  // compute month label positions at first-of-month
  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const firstOfMonth = week.find((d) => d.date.getDate() === 1);
    if (firstOfMonth) {
      const m = firstOfMonth.date.getMonth();
      if (m !== lastMonth) {
        lastMonth = m;
        monthLabels.push({ label: firstOfMonth.date.toLocaleString('en-US', { month: 'short' }), col: i + 1 });
      }
    }
  });

  const total = data.filter((d) => d.intensity > 0).length;
  const streak = useMemo(() => {
    let s = 0;
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
            --glow-color: ${glowColor};
            --border-color: #392e4e;
            --background-dark: #060010;
            --white: hsl(0, 0%, 100%);
            --purple-primary: rgba(132, 0, 255, 1);
            --purple-glow: rgba(132, 0, 255, 0.2);
            --purple-border: rgba(132, 0, 255, 0.8);
          }
          
          .streak-calendar-card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 6px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.6)) 0%,
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.3)) 30%,
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
            box-shadow: 0 4px 20px rgba(46, 24, 78, 0.4), 0 0 30px rgba(${glowColor}, 0.2);
          }
          
          .calendar-day {
            transition: all 0.2s ease;
          }
          
          .calendar-day:hover {
            transform: scale(1.2);
            box-shadow: 0 0 8px rgba(${glowColor}, 0.6);
          }
          
          .calendar-day--active {
            background: linear-gradient(135deg, rgba(${glowColor}, 0.8), rgba(${glowColor}, 0.6));
            box-shadow: 0 0 4px rgba(${glowColor}, 0.4);
          }
          
          .calendar-day--inactive {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
        `}
      </style>

      <ParticleCard
        className={cn(
          'streak-calendar-card streak-calendar-card--border-glow relative w-full p-6 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5',
          className
        )}
        style={{
          backgroundColor: "#060010",
          borderColor: "#392e4e",
          color: "white",
          "--glow-x": "50%",
          "--glow-y": "50%",
          "--glow-intensity": "0",
          "--glow-radius": "200px",
        } as React.CSSProperties}
        disableAnimations={shouldDisableAnimations}
        particleCount={DEFAULT_PARTICLE_COUNT}
        glowColor={glowColor}
        enableTilt={true}
        clickEffect={true}
        enableMagnetism={true}
      >
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-purple-400" />
              <h3 className="text-lg font-medium text-white">Code Activity</h3>
            </div>
            <div className="text-sm text-white/70">
              {total} days · {streak} streak
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {/* Month labels */}
          <div className="flex justify-start mb-3 pl-4">
            {monthLabels.map(({ label, col }, idx) => (
              <div
                key={idx}
                className="text-xs text-white/60 font-medium"
                style={{ 
                  marginLeft: idx === 0 ? '0' : `${(col - (monthLabels[idx-1]?.col || 0)) * 16 - 24}px`,
                  minWidth: '40px'
                }}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-rows-7 grid-flow-col gap-1.5 justify-start">
            {/* Day labels */}
            <div className="text-xs text-white/50 flex items-center justify-center w-3 h-3">S</div>
            <div className="text-xs text-white/50 flex items-center justify-center w-3 h-3">M</div>
            <div className="text-xs text-white/50 flex items-center justify-center w-3 h-3">T</div>
            <div className="text-xs text-white/50 flex items-center justify-center w-3 h-3">W</div>
            <div className="text-xs text-white/50 flex items-center justify-center w-3 h-3">T</div>
            <div className="text-xs text-white/50 flex items-center justify-center w-3 h-3">F</div>
            <div className="text-xs text-white/50 flex items-center justify-center w-3 h-3">S</div>

            {weeks.map((week, w) => {
              // Check if this week starts a new month
              const isNewMonth = week.some(day => day.date.getDate() === 1);
              const marginLeft = isNewMonth && w > 0 ? '8px' : '0';
              
              return week.map((day, d) => (
                <div
                  key={`${w}-${d}`}
                  className={cn(
                    'calendar-day w-3 h-3 rounded-sm cursor-pointer',
                    day.intensity > 0 ? 'calendar-day--active' : 'calendar-day--inactive'
                  )}
                  style={{ 
                    gridColumnStart: w + 2, 
                    gridRowStart: (day.date.getDay()) + 1,
                    marginLeft: d === 0 ? marginLeft : '0'
                  }}
                  title={
                    day.intensity
                      ? `${day.date.toLocaleDateString('en-US')}: 1 session`
                      : `${day.date.toLocaleDateString('en-US')}: No activity`
                  }
                />
              ));
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between mt-4 text-xs text-white/60">
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
