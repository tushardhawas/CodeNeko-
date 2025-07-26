import { useMemo } from 'react';
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow, parseISO } from 'date-fns';

interface Notification {
  id: number;
  message: string;
  time: string; // ISO timestamp
  seen: boolean;
}

interface NotificationPopupProps {
  notifications: Notification[];
  onMarkAllRead: () => void;
  onViewAll: () => void;
}

export function NotificationPopup({ notifications, onMarkAllRead, onViewAll }: NotificationPopupProps) {
  const sorted = useMemo(
    () => [...notifications].sort((a, b) => (a.time > b.time ? -1 : 1)),
    [notifications]
  );

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.seen).length,
    [notifications]
  );

  return (
    <DropdownMenuContent align="end" className="w-80 p-0">
      <div className="flex items-center justify-between px-4 py-2">
        <DropdownMenuLabel className="p-0 text-base">Notifications</DropdownMenuLabel>
        {unreadCount > 0 && <Badge variant="secondary">{unreadCount}</Badge>}
      </div>
      <DropdownMenuSeparator />

      <div className="max-h-64 overflow-y-auto">
        {sorted.length === 0 && (
          <div className="flex flex-col items-center justify-center p-6 space-y-2">
            {/* Placeholder illustration */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m2 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <p className="text-sm text-muted-foreground">You're all caught up!</p>
          </div>
        )}

        <DropdownMenuGroup>
          {sorted.map((n) => {
            const timeAgo = formatDistanceToNow(parseISO(n.time), { addSuffix: true });
            return (
              <DropdownMenuItem
                key={n.id}
                className="flex items-start gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {!n.seen && <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />}
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-gray-100">{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{timeAgo}</p>
                </div>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </div>

      <DropdownMenuSeparator />
      <div className="flex justify-between px-4 py-2">
        <Button variant="ghost" size="sm" onClick={onMarkAllRead} className="px-2">
          Mark all as read
        </Button>
        <Button variant="link" size="sm" onClick={onViewAll} className="px-2">
          View all
        </Button>
      </div>
    </DropdownMenuContent>
  );
}
