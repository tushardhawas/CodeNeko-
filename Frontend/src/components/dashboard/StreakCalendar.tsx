import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreakCalendarProps {
  className?: string;
}

interface DayData {
  date: Date;
  intensity: number; // 0-4 scale (0 = no activity, 4 = high activity)
  hours?: number;
}

// Generate mock data for the last 12 months
const generateCalendarData = (): DayData[] => {
  const data: DayData[] = [];
  const today = new Date();
  const startDate = new Date(today);
  startDate.setMonth(startDate.getMonth() - 12);
  
  // Start from the beginning of the week containing startDate
  const firstDay = new Date(startDate);
  firstDay.setDate(firstDay.getDate() - firstDay.getDay());
  
  for (let i = 0; i < 371; i++) { // ~53 weeks * 7 days
    const date = new Date(firstDay);
    date.setDate(firstDay.getDate() + i);
    
    // Generate realistic coding activity data
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isToday = date.toDateString() === today.toDateString();
    const isPast = date <= today;
    
    let intensity = 0;
    let hours = 0;
    
    if (isPast && !isToday) {
      // Higher activity on weekdays, some weekend activity
      const baseChance = isWeekend ? 0.3 : 0.8;
      const random = Math.random();
      
      if (random < baseChance) {
        if (isWeekend) {
          intensity = Math.floor(Math.random() * 3) + 1; // 1-3
          hours = intensity * 1.5;
        } else {
          intensity = Math.floor(Math.random() * 4) + 1; // 1-4
          hours = intensity * 2;
        }
      }
    } else if (isToday) {
      // Today's activity (current session)
      intensity = 3;
      hours = 4.5;
    }
    
    data.push({ date, intensity, hours });
  }
  
  return data;
};

const getIntensityColor = (intensity: number): string => {
  switch (intensity) {
    case 0: return 'bg-muted/30 dark:bg-muted/20';
    case 1: return 'bg-primary/20 dark:bg-primary/30';
    case 2: return 'bg-primary/40 dark:bg-primary/50';
    case 3: return 'bg-primary/60 dark:bg-primary/70';
    case 4: return 'bg-primary dark:bg-primary';
    default: return 'bg-muted/30 dark:bg-muted/20';
  }
};

const getTooltipText = (day: DayData): string => {
  const dateStr = day.date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
  
  if (day.intensity === 0) {
    return `${dateStr}: No coding activity`;
  }
  
  return `${dateStr}: ${day.hours?.toFixed(1)}h coding`;
};

const getMonthLabels = (data: DayData[]): { month: string; x: number }[] => {
  const months: { month: string; x: number }[] = [];
  let currentMonth = -1;
  
  data.forEach((day, index) => {
    const month = day.date.getMonth();
    const weekIndex = Math.floor(index / 7);
    
    if (month !== currentMonth && day.date.getDate() <= 7) {
      currentMonth = month;
      months.push({
        month: day.date.toLocaleDateString('en-US', { month: 'short' }),
        x: weekIndex * 12 + 2 // 12px per week + 2px offset
      });
    }
  });
  
  return months;
};

export function StreakCalendar({ className }: StreakCalendarProps) {
  const calendarData = useMemo(() => generateCalendarData(), []);
  const monthLabels = useMemo(() => getMonthLabels(calendarData), [calendarData]);
  
  // Calculate streak stats
  const totalDays = calendarData.filter(day => day.intensity > 0).length;
  const currentStreak = useMemo(() => {
    let streak = 0;
    const today = new Date();
    
    for (let i = calendarData.length - 1; i >= 0; i--) {
      const day = calendarData[i];
      if (day.date > today) continue;
      
      if (day.intensity > 0) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  }, [calendarData]);
  
  // Group data by weeks
  const weeks: DayData[][] = [];
  for (let i = 0; i < calendarData.length; i += 7) {
    weeks.push(calendarData.slice(i, i + 7));
  }
  
  return (
    <Card className={cn("overflow-hidden transition-all duration-200 hover:shadow-sm", className)}>
      <CardHeader className="py-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-sm">
            <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
            Coding Activity
          </CardTitle>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{totalDays} days this year</span>
            <span>{currentStreak} day streak</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-3 py-2">
        <div className="relative">
          {/* Month labels */}
          <div className="relative h-4 mb-1">
            {monthLabels.map((label, index) => (
              <span
                key={index}
                className="absolute text-xs text-muted-foreground"
                style={{ left: `${label.x}px` }}
              >
                {label.month}
              </span>
            ))}
          </div>
          
          {/* Calendar grid */}
          <div className="flex gap-1 overflow-x-auto pb-2">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={cn(
                      "w-2.5 h-2.5 rounded-sm cursor-pointer transition-all duration-200 hover:ring-1 hover:ring-primary/50",
                      getIntensityColor(day.intensity)
                    )}
                    title={getTooltipText(day)}
                  />
                ))}
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>Less</span>
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((intensity) => (
                <div
                  key={intensity}
                  className={cn(
                    "w-2.5 h-2.5 rounded-sm",
                    getIntensityColor(intensity)
                  )}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
