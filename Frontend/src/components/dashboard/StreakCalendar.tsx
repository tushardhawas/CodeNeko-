import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

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

// Gray for no activity, green for demo activity
const COLORS = [
  'bg-gray-200 dark:bg-gray-800',
  'bg-green-500 dark:bg-green-400',
];

export function StreakCalendar({ className }: StreakCalendarProps) {
  const data = useMemo(generateData, []);

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
    <Card className={cn('p-4', className)}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm flex items-center">
            <CalendarIcon className="mr-1 h-4 w-4 text-green-500" />
            Code Activity
          </CardTitle>
          <div className="text-xs text-gray-500">
            {total} days · {streak} streak
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {/* grid: first row month labels, next 7 rows for weekdays Sunday->Saturday */}
          <div className="grid grid-rows-[auto_7] grid-flow-col gap-1">
            {monthLabels.map(({ label, col }, idx) => (
              <div
                key={idx}
                className="text-[10px] text-gray-500"
                style={{ gridColumnStart: col, gridRowStart: 1 }}
              >
                {label}
              </div>
            ))}

            {weeks.map((week, w) =>
              week.map((day, d) => (
                <div
                  key={`${w}-${d}`}
                  className={cn('w-2 h-2 rounded-sm', COLORS[day.intensity])}
                  style={{ gridColumnStart: w + 1, gridRowStart: (day.date.getDay() || 0) + 2 }}
                  title={
                    day.intensity
                      ? `${day.date.toLocaleDateString('en-US')}: 1 session`
                      : `${day.date.toLocaleDateString('en-US')}: No activity`
                  }
                />
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
