import { useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { UsersIcon, ThumbsUpIcon, MessageCircleIcon, CodeIcon, GitBranchIcon } from 'lucide-react';
import { useUser } from '@/lib/user-provider';
import { animate, stagger } from 'motion';

// Activity types
type ActivityType = 'coding' | 'achievement' | 'level-up' | 'streak' | 'project';

interface ActivityItem {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  type: ActivityType;
  content: string;
  timestamp: string;
  meta?: {
    achievement?: string;
    level?: number;
    streak?: number;
    project?: string;
    language?: string;
    hours?: string;
  };
  likes: number;
  hasLiked: boolean;
}

// Mock activity data
const mockActivities: ActivityItem[] = [
  {
    id: '1',
    user: {
      id: '2',
      name: 'Sarah Chen',
      username: 'sarahdev',
      avatar: '',
    },
    type: 'achievement',
    content: 'earned the "Night Owl" achievement!',
    timestamp: '2 hours ago',
    meta: {
      achievement: 'Night Owl',
    },
    likes: 5,
    hasLiked: false,
  },
  {
    id: '2',
    user: {
      id: '3',
      name: 'Miguel Rodriguez',
      username: 'miguelr',
      avatar: '',
    },
    type: 'streak',
    content: 'is on a 7-day coding streak!',
    timestamp: '5 hours ago',
    meta: {
      streak: 7,
    },
    likes: 3,
    hasLiked: true,
  },
  {
    id: '3',
    user: {
      id: '4',
      name: 'Emma Wilson',
      username: 'emmaw',
      avatar: '',
    },
    type: 'coding',
    content: 'coded for 4 hours today in React and TypeScript.',
    timestamp: '1 day ago',
    meta: {
      language: 'TypeScript',
      hours: '4 hours',
    },
    likes: 8,
    hasLiked: false,
  },
  {
    id: '4',
    user: {
      id: '5',
      name: 'David Kim',
      username: 'davidk',
      avatar: '',
    },
    type: 'project',
    content: 'started a new project called "TaskMaster".',
    timestamp: '2 days ago',
    meta: {
      project: 'TaskMaster',
    },
    likes: 12,
    hasLiked: true,
  },
  {
    id: '5',
    user: {
      id: '2',
      name: 'Sarah Chen',
      username: 'sarahdev',
      avatar: '',
    },
    type: 'level-up',
    content: 'reached Level 8!',
    timestamp: '3 days ago',
    meta: {
      level: 8,
    },
    likes: 15,
    hasLiked: false,
  },
];

export function SocialActivityFeed() {
  const { isLoading } = useUser();
  const feedRef = useRef<HTMLDivElement>(null);

  // Animation effect when component mounts
  useEffect(() => {
    if (!isLoading && feedRef.current) {
      // Animate activity items with staggered effect
      const activityItems = Array.from(feedRef.current.querySelectorAll('.activity-item'));
      animate(
        activityItems,
        { opacity: [0, 1], y: [20, 0] },
        { duration: 0.5, delay: stagger(0.1) }
      );
    }
  }, [isLoading]);

  // Get icon based on activity type
  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'coding':
        return <CodeIcon className="h-5 w-5 text-blue-500" />;
      case 'achievement':
        return <Badge className="h-5 w-5 text-yellow-500" />;
      case 'level-up':
        return <UsersIcon className="h-5 w-5 text-green-500" />;
      case 'streak':
        return <GitBranchIcon className="h-5 w-5 text-purple-500" />;
      case 'project':
        return <CodeIcon className="h-5 w-5 text-orange-500" />;
      default:
        return <CodeIcon className="h-5 w-5 text-primary" />;
    }
  };

  if (isLoading) {
    return <div>Loading activity feed...</div>;
  }

  return (
    <Card>
      <CardHeader className="bg-primary/5">
        <CardTitle className="flex items-center">
          <UsersIcon className="mr-2 h-5 w-5 text-primary" />
          Social Activity
        </CardTitle>
        <CardDescription>See what your friends are up to</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div ref={feedRef} className="divide-y">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="activity-item p-4 transition-all duration-300 hover:bg-muted/10">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10 border-2 border-primary/20">
                  <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-medium">
                        <span className="mr-1">{activity.user.name}</span>
                        <span className="text-muted-foreground">{activity.content}</span>
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                    <div className="flex h-8 items-center gap-1">
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>

                  {/* Activity-specific content */}
                  {activity.type === 'achievement' && activity.meta?.achievement && (
                    <div className="mt-2 rounded-md bg-yellow-50 p-2 dark:bg-yellow-900/20">
                      <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                        🏆 {activity.meta.achievement}
                      </p>
                    </div>
                  )}

                  {activity.type === 'level-up' && activity.meta?.level && (
                    <div className="mt-2 rounded-md bg-green-50 p-2 dark:bg-green-900/20">
                      <p className="text-sm font-medium text-green-800 dark:text-green-300">
                        🚀 Level {activity.meta.level}
                      </p>
                    </div>
                  )}

                  {activity.type === 'project' && activity.meta?.project && (
                    <div className="mt-2 rounded-md bg-orange-50 p-2 dark:bg-orange-900/20">
                      <p className="text-sm font-medium text-orange-800 dark:text-orange-300">
                        📂 {activity.meta.project}
                      </p>
                    </div>
                  )}

                  <div className="mt-3 flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 gap-1 px-2 ${activity.hasLiked ? 'text-primary' : 'text-muted-foreground'}`}
                    >
                      <ThumbsUpIcon className="h-4 w-4" />
                      <span>{activity.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 text-muted-foreground">
                      <MessageCircleIcon className="h-4 w-4" />
                      <span>Comment</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/20 px-6 py-3">
        <Button variant="ghost" size="sm" className="ml-auto">View All Activity</Button>
      </CardFooter>
    </Card>
  );
}
