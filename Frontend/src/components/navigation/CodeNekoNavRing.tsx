import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  BarChart3Icon,
  ClockIcon,
  FolderIcon,
  HomeIcon,
  SettingsIcon,
  TrophyIcon,
  CatIcon,
  PlusIcon,
  XIcon,
  SearchIcon,
  BellIcon,
  UserIcon,
  CodeIcon,
  LayoutDashboardIcon
} from 'lucide-react';
import { useTheme } from '@/lib/theme-provider';
import { useUser } from '@/lib/user-provider';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import catMascotLight from '@/assets/cat-mascot-enhanced.svg';
import catMascotDark from '@/assets/cat-mascot-dark.svg';

interface NavigationItem {
  title: string;
  href: string;
  icon: React.ElementType;
  description: string;
  color: string;
}

const navigationItems: NavigationItem[] = [
  {
    title: 'Dashboard',
    href: '/app',
    icon: LayoutDashboardIcon,
    description: 'Your coding overview',
    color: 'bg-orange-500 dark:bg-blue-500'
  },
  {
    title: 'Stats',
    href: '/app/stats',
    icon: BarChart3Icon,
    description: 'Detailed analytics',
    color: 'bg-amber-500 dark:bg-indigo-500'
  },
  {
    title: 'Tracker',
    href: '/app/tracker',
    icon: ClockIcon,
    description: 'Time management',
    color: 'bg-yellow-500 dark:bg-violet-500'
  },
  {
    title: 'Projects',
    href: '/app/projects',
    icon: FolderIcon,
    description: 'Your work',
    color: 'bg-lime-500 dark:bg-purple-500'
  },
  {
    title: 'Leaderboard',
    href: '/app/leaderboard',
    icon: TrophyIcon,
    description: 'Compare progress',
    color: 'bg-green-500 dark:bg-fuchsia-500'
  },
  {
    title: 'Cat',
    href: '/app/cat',
    icon: CatIcon,
    description: 'Your companion',
    color: 'bg-emerald-500 dark:bg-pink-500'
  },
  {
    title: 'Settings',
    href: '/app/settings',
    icon: SettingsIcon,
    description: 'Customize CodeNeko',
    color: 'bg-teal-500 dark:bg-rose-500'
  },
];

export function CodeNekoNavRing() {
  const location = useLocation();
  const { theme } = useTheme();
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const catMascot = theme === 'dark' ? catMascotDark : catMascotLight;
  
  // Find current active route
  useEffect(() => {
    const index = navigationItems.findIndex(item => item.href === location.pathname);
    setActiveIndex(index >= 0 ? index : 0);
  }, [location.pathname]);
  
  // Initialize position in bottom right corner
  useEffect(() => {
    const initialX = window.innerWidth - 80;
    const initialY = window.innerHeight - 80;
    setPosition({ x: initialX, y: initialY });
    setLastPosition({ x: initialX, y: initialY });
  }, []);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Keep within viewport bounds when window is resized
      setPosition(prev => ({
        x: Math.min(prev.x, window.innerWidth - 80),
        y: Math.min(prev.y, window.innerHeight - 80)
      }));
      setLastPosition(prev => ({
        x: Math.min(prev.x, window.innerWidth - 80),
        y: Math.min(prev.y, window.innerHeight - 80)
      }));
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleDragStart = () => {
    setIsDragging(true);
    if (isOpen) setIsOpen(false);
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
    setLastPosition(position);
    
    // Snap to edges if close enough
    const snapDistance = 20;
    const newPosition = { ...position };
    
    if (position.x < snapDistance) newPosition.x = 0;
    if (position.y < snapDistance) newPosition.y = 0;
    if (window.innerWidth - position.x < snapDistance + 80) newPosition.x = window.innerWidth - 80;
    if (window.innerHeight - position.y < snapDistance + 80) newPosition.y = window.innerHeight - 80;
    
    setPosition(newPosition);
    setLastPosition(newPosition);
  };
  
  const toggleRing = () => {
    if (!isDragging) {
      setIsOpen(!isOpen);
    }
  };
  
  return (
    <motion.div
      ref={ringRef}
      className="fixed z-50"
      initial={{ x: position.x, y: position.y }}
      animate={{ x: position.x, y: position.y }}
      drag
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrag={(e, info) => {
        setPosition({
          x: lastPosition.x + info.offset.x,
          y: lastPosition.y + info.offset.y
        });
      }}
      style={{ touchAction: 'none' }}
    >
      {/* Main Button */}
      <motion.button
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-full shadow-lg cursor-grab active:cursor-grabbing",
          isOpen ? "bg-red-500 dark:bg-red-600" : "bg-primary"
        )}
        onClick={toggleRing}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <XIcon className="h-6 w-6 text-white" />
        ) : (
          <div className="relative">
            <img src={catMascot} alt="CodeNeko" className="h-10 w-10" />
            {activeIndex >= 0 && (
              <div className={cn(
                "absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white",
                navigationItems[activeIndex].color
              )}></div>
            )}
          </div>
        )}
      </motion.button>
      
      {/* Navigation Ring */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background overlay for clicking outside to close */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{ touchAction: 'none' }}
            />
            
            {/* Navigation items in a ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {navigationItems.map((item, index) => {
                // Calculate position in a circle
                const angle = (index * (2 * Math.PI / navigationItems.length)) - Math.PI/2;
                const radius = 100; // Distance from center
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                const isActive = location.pathname === item.href;
                
                return (
                  <motion.div
                    key={item.href}
                    className="absolute"
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    animate={{ 
                      x, 
                      y, 
                      opacity: 1, 
                      scale: 1,
                      transition: { 
                        type: 'spring',
                        delay: index * 0.05,
                        stiffness: 150,
                        damping: 15
                      }
                    }}
                    exit={{ 
                      x: 0, 
                      y: 0, 
                      opacity: 0, 
                      scale: 0,
                      transition: { 
                        duration: 0.2,
                        delay: (navigationItems.length - index) * 0.03
                      }
                    }}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            to={item.href}
                            className={cn(
                              "flex h-12 w-12 items-center justify-center rounded-full shadow-md transition-all",
                              isActive 
                                ? item.color
                                : "bg-card hover:bg-card/80 dark:bg-card/80 dark:hover:bg-card/60"
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            <item.icon className={cn(
                              "h-5 w-5",
                              isActive ? "text-white" : "text-primary"
                            )} />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <div className="flex flex-col">
                            <span className="font-medium">{item.title}</span>
                            <span className="text-xs text-muted-foreground">{item.description}</span>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
