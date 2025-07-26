import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';

import {
  ClockIcon,
  TrophyIcon,
  BarChart3Icon,
  FolderIcon,
  CatIcon,
  ActivityIcon,
  ZapIcon,
  CodeIcon
} from 'lucide-react';
import { useUser } from '@/lib/user-provider';
import { animate, stagger } from 'motion';
import { StreakCalendar } from '@/components/dashboard/StreakCalendar';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import ShinyText from '@/components/Custom/ShinyText';

// MagicBento constants
const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
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
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
});

const updateCardGlowProperties = (
  card: HTMLElement,
  mouseX: number,
  mouseY: number,
  glow: number,
  radius: number
) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty("--glow-x", `${relativeX}%`);
  card.style.setProperty("--glow-y", `${relativeY}%`);
  card.style.setProperty("--glow-intensity", glow.toString());
  card.style.setProperty("--glow-radius", `${radius}px`);
};

// Helper function to get greeting based on time of day
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
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
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, index * 100);

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
          rotateX: 5,
          rotateY: 5,
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
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;

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
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
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

// GlobalSpotlight component
const GlobalSpotlight: React.FC<{
  gridRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}> = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const isInsideSection = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement("div");
    spotlight.className = "global-spotlight";
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest(".bento-section");
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      isInsideSection.current = mouseInside || false;
      const cards = gridRef.current.querySelectorAll(".magic-card");

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        cards.forEach((card) => {
          (card as HTMLElement).style.setProperty("--glow-intensity", "0");
        });
        return;
      }

      const { proximity, fadeDistance } =
        calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach((card) => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) -
          Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity =
            (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(
          cardElement,
          e.clientX,
          e.clientY,
          glowIntensity,
          spotlightRadius
        );
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current?.querySelectorAll(".magic-card").forEach((card) => {
        (card as HTMLElement).style.setProperty("--glow-intensity", "0");
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

export default function Dashboard() {
  const { user, isLoading } = useUser();
  const statsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // MagicBento settings
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

  // Animation effect when component mounts
  useEffect(() => {
    if (!isLoading && statsRef.current) {
      // Animate stats cards with staggered effect
      const statCards = Array.from(statsRef.current.children);
      animate(
        statCards,
        { opacity: [0, 1], y: [20, 0] },
        { duration: 0.5, delay: stagger(0.1) }
      );
    }

    if (!isLoading && projectsRef.current) {
      // Animate project bars
      const projectItems = Array.from(projectsRef.current.querySelectorAll('.project-item'));
      animate(
        projectItems,
        { opacity: [0, 1], x: [-20, 0] },
        { duration: 0.5, delay: stagger(0.1) }
      );

      // Animate progress bars
      const progressBars = Array.from(projectsRef.current.querySelectorAll('.progress-bar'));
      progressBars.forEach((bar, index) => {
        const width = user?.recentProjects[index]?.percentage || 0;
        animate(
          bar as HTMLElement,
          { width: ['0%', `${width}%`] },
          { duration: 1, delay: 0.5 + (index * 0.2) }
        );
      });
    }

    if (!isLoading && socialRef.current) {
      // Animate social activity items
      const socialItems = Array.from(socialRef.current.querySelectorAll('.social-item'));
      animate(
        socialItems,
        { opacity: [0, 1], scale: [0.95, 1] },
        { duration: 0.5, delay: stagger(0.1) }
      );
    }
  }, [isLoading, user]);

  if (isLoading) {
    return <div className="flex h-[60vh] items-center justify-center">Loading your personalized dashboard...</div>;
  }

  if (!user) {
    return <div>Could not load user data</div>;
  }

  return (
    <>
      <style>
        {`
          .bento-section {
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
          
          .magic-card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 6px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.8)) 0%,
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.4)) 30%,
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
            box-shadow: 0 4px 20px rgba(46, 24, 78, 0.4), 0 0 30px rgba(${glowColor}, 0.2);
          }
          
          .particle::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: rgba(${glowColor}, 0.2);
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
        `}
      </style>

      <GlobalSpotlight
        gridRef={gridRef}
        disableAnimations={shouldDisableAnimations}
        enabled={true}
        spotlightRadius={DEFAULT_SPOTLIGHT_RADIUS}
        glowColor={glowColor}
      />

      <div className="space-y-4">
        {/* Header with greeting */}
        <div className="mb-4">
          <div className="flex-1">
            <h1 className="text-xl  md:text-3xl">
              <ShinyText 
                text={`${getGreeting()}, ${user.name}`}
                className="text-xl  md:text-3xl"
                speed={4}
              />
            </h1>
            <div className="mt-1">
              <ShinyText 
                text="Ready to code today?" 
                className="text-sm"
                speed={3}
              />
            </div>
          </div>
        </div>

        {/* Streak Calendar - Featured at the top */}
        <div className="mb-8">
          <StreakCalendar />
        </div>

        {/* Main Stats Row - Key metrics */}
        <div 
          className="bento-section grid gap-4 mb-8 max-w-[80rem] select-none relative"
          style={{ fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.5rem)" }}
          ref={gridRef}
        >
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {/* Coding Time Card */}
            <ParticleCard
              className="magic-card magic-card--border-glow flex flex-col justify-between relative aspect-[4/3] min-h-[160px] w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5"
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
              <div className="card__header flex justify-between gap-3 relative text-white">
                <span className="card__label text-sm flex items-center gap-2">
                  <ClockIcon className="h-4 w-4" />
                  Coding Time
                </span>
              </div>
              <div className="card__content flex flex-col relative text-white">
                <h3 className="card__title font-normal text-2xl m-0 mb-1">
                  {user.stats.totalCodingTime}
                </h3>
                <p className="card__description text-xs leading-4 opacity-90">
                  Total time spent coding
                </p>
              </div>
            </ParticleCard>

            {/* Streak Card */}
            <ParticleCard
              className="magic-card magic-card--border-glow flex flex-col justify-between relative aspect-[4/3] min-h-[160px] w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5"
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
              <div className="card__header flex justify-between gap-3 relative text-white">
                <span className="card__label text-sm flex items-center gap-2">
                  <TrophyIcon className="h-4 w-4" />
                  Streak
                </span>
              </div>
              <div className="card__content flex flex-col relative text-white">
                <h3 className="card__title font-normal text-2xl m-0 mb-1">
                  {user.stats.currentStreak} days
                </h3>
                <p className="card__description text-xs leading-4 opacity-90">
                  Current coding streak
                </p>
              </div>
            </ParticleCard>

            {/* Performance Card */}
            <ParticleCard
              className="magic-card magic-card--border-glow flex flex-col justify-between relative aspect-[4/3] min-h-[160px] w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5"
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
              <div className="card__header flex justify-between gap-3 relative text-white">
                <span className="card__label text-sm flex items-center gap-2">
                  <ActivityIcon className="h-4 w-4" />
                  Performance
                </span>
              </div>
              <div className="card__content flex flex-col relative text-white">
                <h3 className="card__title font-normal text-2xl m-0 mb-1">
                  85%
                </h3>
                <p className="card__description text-xs leading-4 opacity-90">
                  Weekly performance
                </p>
              </div>
            </ParticleCard>

            {/* Cat Status Card */}
            <ParticleCard
              className="magic-card magic-card--border-glow flex flex-col justify-between relative aspect-[4/3] min-h-[160px] w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5"
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
              <div className="card__header flex justify-between gap-3 relative text-white">
                <span className="card__label text-sm flex items-center gap-2">
                  <CatIcon className="h-4 w-4" />
                  Cat Status
                </span>
              </div>
              <div className="card__content flex flex-col relative text-white text-center">
                <div className="text-3xl mb-2">😸</div>
                <h3 className="card__title font-normal text-lg m-0 mb-1">Happy</h3>
                <p className="card__description text-xs leading-4 opacity-90">
                  Your cat is pleased!
                </p>
              </div>
            </ParticleCard>
          </div>
        </div>

        {/* Secondary Content Grid - Projects, Languages, Actions */}
        <div className="bento-section grid gap-4 max-w-[80rem] select-none relative">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
            {/* Recent Projects Card - Larger */}
            <ParticleCard
              className="magic-card magic-card--border-glow flex flex-col justify-between relative min-h-[280px] w-full max-w-full p-6 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5 lg:col-span-2"
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
              <div className="card__header flex justify-between gap-3 relative text-white mb-4">
                <span className="card__label text-lg flex items-center gap-2">
                  <FolderIcon className="h-5 w-5" />
                  Recent Projects
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-white/70 hover:text-white hover:bg-white/10"
                  onClick={() => navigate('/app/projects')}
                >
                  View All
                </Button>
              </div>
              <div className="card__content flex flex-col relative text-white flex-1">
                <div ref={projectsRef} className="space-y-4">
                  {user.recentProjects.slice(0, 4).map((project, index) => (
                    <div key={index} className="project-item flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20">
                        <FolderIcon className="h-5 w-5 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium">{project.name}</p>
                          <p className="text-xs text-white/70">{project.time}</p>
                        </div>
                        <div className="h-2 w-full rounded-full bg-white/10">
                          <div className="progress-bar h-full w-0 rounded-full bg-purple-500"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ParticleCard>

            {/* Right Column - Languages & Actions */}
            <div className="space-y-4">
              {/* Language Distribution Card */}
              <ParticleCard
                className="magic-card magic-card--border-glow flex flex-col justify-between relative min-h-[180px] w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5"
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
                <div className="card__header flex justify-between gap-3 relative text-white mb-3">
                  <span className="card__label text-base flex items-center gap-2">
                    <CodeIcon className="h-4 w-4" />
                    Languages
                  </span>
                </div>
                <div className="card__content flex flex-col relative text-white">
                  <div className="space-y-3">
                    {user.languageDistribution.slice(0, 3).map((lang, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{lang.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-purple-500 rounded-full transition-all duration-1000"
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

              {/* Quick Actions Card */}
              <ParticleCard
                className="magic-card magic-card--border-glow flex flex-col justify-between relative min-h-[180px] w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5"
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
                <div className="card__header flex justify-between gap-3 relative text-white mb-3">
                  <span className="card__label text-base flex items-center gap-2">
                    <ZapIcon className="h-4 w-4" />
                    Quick Actions
                  </span>
                </div>
                <div className="card__content flex flex-col relative text-white">
                  <div className="grid grid-cols-1 gap-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-10 text-sm bg-white/10 border-white/20 text-white hover:bg-white/20 justify-start" 
                      onClick={() => navigate('/app/tracker')}
                    >
                      <ClockIcon className="h-4 w-4 mr-2" />
                      Start Timer
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-10 text-sm bg-white/10 border-white/20 text-white hover:bg-white/20 justify-start" 
                      onClick={() => navigate('/app/projects')}
                    >
                      <FolderIcon className="h-4 w-4 mr-2" />
                      New Project
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-10 text-sm bg-white/10 border-white/20 text-white hover:bg-white/20 justify-start" 
                      onClick={() => navigate('/app/stats')}
                    >
                      <BarChart3Icon className="h-4 w-4 mr-2" />
                      View Stats
                    </Button>
                  </div>
                </div>
              </ParticleCard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
