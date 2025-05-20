import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

// Define user types
export interface UserStats {
  totalCodingTime: string;
  weeklyChange: string;
  currentStreak: number;
  xpEarned: number;
  level: number;
  xpToNextLevel: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  date?: string;
}

export interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  lastActive: string;
  isOnline: boolean;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  showCatAnimations: boolean;
  dailyGoalHours: number;
  weeklyReports: boolean;
  showStreak: boolean;
  showXP: boolean;
  showRank: boolean;
}

export interface UserData {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  website?: string;
  github?: string;
  twitter?: string;
  stats: UserStats;
  preferences: UserPreferences;
  friends: Friend[];
  recentProjects: {
    name: string;
    time: string;
    percentage: number;
  }[];
  languageDistribution: {
    name: string;
    percentage: number;
  }[];
}

// Mock user data
const mockUserData: UserData = {
  id: '1',
  name: 'John Doe',
  username: 'johndoe',
  email: 'john.doe@example.com',
  avatar: '',
  bio: 'Full-stack developer passionate about React, TypeScript, and building great user experiences.',
  website: 'https://johndoe.dev',
  github: 'johndoe',
  twitter: 'johndoedev',
  stats: {
    totalCodingTime: '24h 30m',
    weeklyChange: '+2.5%',
    currentStreak: 5,
    xpEarned: 1250,
    level: 5,
    xpToNextLevel: 750,
    achievements: [
      {
        id: '1',
        title: 'Early Bird',
        description: 'Code for 5 days in a row before 9 AM',
        icon: 'sunrise',
        earned: true,
        date: '2023-05-15',
      },
      {
        id: '2',
        title: 'Night Owl',
        description: 'Code for 3 hours after midnight',
        icon: 'moon',
        earned: true,
        date: '2023-05-10',
      },
      {
        id: '3',
        title: 'TypeScript Wizard',
        description: 'Write 1000 lines of TypeScript code',
        icon: 'code',
        earned: false,
      },
    ],
  },
  preferences: {
    theme: 'system',
    showCatAnimations: true,
    dailyGoalHours: 4,
    weeklyReports: true,
    showStreak: true,
    showXP: true,
    showRank: true,
  },
  friends: [
    {
      id: '1',
      name: 'Sarah Chen',
      username: 'sarahdev',
      avatar: '',
      xp: 4950,
      level: 8,
      streak: 12,
      lastActive: '2 hours ago',
      isOnline: true,
    },
    {
      id: '2',
      name: 'Miguel Rodriguez',
      username: 'miguelr',
      avatar: '',
      xp: 4820,
      level: 7,
      streak: 3,
      lastActive: '1 day ago',
      isOnline: false,
    },
    {
      id: '3',
      name: 'Emma Wilson',
      username: 'emmaw',
      avatar: '',
      xp: 4650,
      level: 7,
      streak: 8,
      lastActive: '3 hours ago',
      isOnline: true,
    },
  ],
  recentProjects: [
    {
      name: 'CodeNeko',
      time: '10h 15m',
      percentage: 75,
    },
    {
      name: 'Personal Website',
      time: '5h 45m',
      percentage: 40,
    },
    {
      name: 'E-commerce App',
      time: '3h 20m',
      percentage: 25,
    },
  ],
  languageDistribution: [
    {
      name: 'TypeScript',
      percentage: 60,
    },
    {
      name: 'JavaScript',
      percentage: 20,
    },
    {
      name: 'CSS',
      percentage: 15,
    },
    {
      name: 'HTML',
      percentage: 5,
    },
  ],
};

// Create context
type UserContextType = {
  user: UserData | null;
  isLoading: boolean;
  updateUser: (data: Partial<UserData>) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
    const fetchUser = async () => {
      setIsLoading(true);
      // In a real app, this would be an API call
      setTimeout(() => {
        setUser(mockUserData);
        setIsLoading(false);
      }, 500);
    };

    fetchUser();
  }, []);

  const updateUser = (data: Partial<UserData>) => {
    setUser(prev => prev ? { ...prev, ...data } : null);
  };

  const updatePreferences = (prefs: Partial<UserPreferences>) => {
    setUser(prev =>
      prev ? { ...prev, preferences: { ...prev.preferences, ...prefs } } : null
    );
  };

  return (
    <UserContext.Provider value={{ user, isLoading, updateUser, updatePreferences }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook for using the user context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
