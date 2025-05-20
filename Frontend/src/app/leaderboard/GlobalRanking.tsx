import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SearchIcon, ArrowUpIcon, ArrowDownIcon, MinusIcon } from 'lucide-react';

interface RankingUser {
  id: string;
  rank: number;
  name: string;
  username: string;
  avatar: string;
  xp: number;
  change: 'up' | 'down' | 'same';
}

const mockUsers: RankingUser[] = [
  {
    id: '1',
    rank: 1,
    name: 'Alex Johnson',
    username: 'alexcode',
    avatar: '',
    xp: 5280,
    change: 'same',
  },
  {
    id: '2',
    rank: 2,
    name: 'Sarah Chen',
    username: 'sarahdev',
    avatar: '',
    xp: 4950,
    change: 'up',
  },
  {
    id: '3',
    rank: 3,
    name: 'Miguel Rodriguez',
    username: 'miguelr',
    avatar: '',
    xp: 4820,
    change: 'down',
  },
  {
    id: '4',
    rank: 4,
    name: 'Emma Wilson',
    username: 'emmaw',
    avatar: '',
    xp: 4650,
    change: 'up',
  },
  {
    id: '5',
    rank: 5,
    name: 'David Kim',
    username: 'davidk',
    avatar: '',
    xp: 4520,
    change: 'same',
  },
  {
    id: '6',
    rank: 6,
    name: 'Olivia Taylor',
    username: 'oliviat',
    avatar: '',
    xp: 4350,
    change: 'up',
  },
  {
    id: '7',
    rank: 7,
    name: 'James Smith',
    username: 'jamessmith',
    avatar: '',
    xp: 4120,
    change: 'down',
  },
  {
    id: '8',
    rank: 8,
    name: 'Sophia Garcia',
    username: 'sophiag',
    avatar: '',
    xp: 3980,
    change: 'up',
  },
  {
    id: '9',
    rank: 9,
    name: 'Liam Brown',
    username: 'liamb',
    avatar: '',
    xp: 3850,
    change: 'down',
  },
  {
    id: '10',
    rank: 10,
    name: 'Ava Martinez',
    username: 'avam',
    avatar: '',
    xp: 3720,
    change: 'same',
  },
];

export default function GlobalRanking() {
  const [users] = useState<RankingUser[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getChangeIcon = (change: 'up' | 'down' | 'same') => {
    switch (change) {
      case 'up':
        return <ArrowUpIcon className="h-4 w-4 text-green-500" />;
      case 'down':
        return <ArrowDownIcon className="h-4 w-4 text-red-500" />;
      case 'same':
        return <MinusIcon className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Global Rankings</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/app/leaderboard/friends">View Friends</Link>
          </Button>
        </div>
      </div>

      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <div className="grid grid-cols-12 border-b bg-muted/50 px-4 py-3 text-sm font-medium">
              <div className="col-span-1">Rank</div>
              <div className="col-span-7">User</div>
              <div className="col-span-3 text-right">XP</div>
              <div className="col-span-1 text-right">Change</div>
            </div>
            <div className="divide-y">
              {filteredUsers.map((user) => (
                <div key={user.id} className="grid grid-cols-12 items-center px-4 py-3">
                  <div className="col-span-1 font-medium">#{user.rank}</div>
                  <div className="col-span-7 flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">@{user.username}</p>
                    </div>
                  </div>
                  <div className="col-span-3 text-right font-medium">{user.xp.toLocaleString()} XP</div>
                  <div className="col-span-1 flex justify-end">{getChangeIcon(user.change)}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
