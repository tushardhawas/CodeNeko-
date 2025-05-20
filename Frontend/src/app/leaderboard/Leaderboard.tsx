import { Outlet } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrophyIcon } from 'lucide-react';

export default function Leaderboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <TrophyIcon className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground">See how you rank against other developers</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Ranking</CardTitle>
          <CardDescription>Your current position on the leaderboard</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                #42
              </div>
              <div>
                <p className="font-medium">Your Rank</p>
                <p className="text-sm text-muted-foreground">Top 15% of all users</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">1,250 XP</p>
              <p className="text-sm text-muted-foreground">This month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Outlet />
    </div>
  );
}
