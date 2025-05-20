import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { TrophyIcon, SearchIcon, ArrowUpIcon, ArrowDownIcon, MinusIcon, UserPlusIcon } from 'lucide-react';

interface FriendUser {
  id: string;
  rank: number;
  name: string;
  username: string;
  avatar: string;
  xp: number;
  change: 'up' | 'down' | 'same';
  streak: number;
}

const mockFriends: FriendUser[] = [
  {
    id: '1',
    rank: 1,
    name: 'Taylor Swift',
    username: 'tswift',
    avatar: '',
    xp: 3250,
    change: 'up',
    streak: 12,
  },
  {
    id: '2',
    rank: 2,
    name: 'John Doe',
    username: 'johnd',
    avatar: '',
    xp: 2980,
    change: 'same',
    streak: 8,
  },
  {
    id: '3',
    rank: 3,
    name: 'Jane Smith',
    username: 'janes',
    avatar: '',
    xp: 2750,
    change: 'down',
    streak: 5,
  },
  {
    id: '4',
    rank: 4,
    name: 'Robert Johnson',
    username: 'robertj',
    avatar: '',
    xp: 2520,
    change: 'up',
    streak: 3,
  },
  {
    id: '5',
    rank: 5,
    name: 'Emily Davis',
    username: 'emilyd',
    avatar: '',
    xp: 2340,
    change: 'same',
    streak: 7,
  },
];

export default function FriendsRanking() {
  const [friends] = useState<FriendUser[]>(mockFriends);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
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
        <h2 className="text-xl font-semibold">Friends Rankings</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/app/leaderboard">View Global</Link>
          </Button>
          <Button size="sm">
            <UserPlusIcon className="mr-2 h-4 w-4" />
            Add Friend
          </Button>
        </div>
      </div>

      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search friends..."
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
              <div className="col-span-5">Friend</div>
              <div className="col-span-2 text-right">XP</div>
              <div className="col-span-3 text-right">Streak</div>
              <div className="col-span-1 text-right">Change</div>
            </div>
            <div className="divide-y">
              {filteredFriends.map((friend) => (
                <div key={friend.id} className="grid grid-cols-12 items-center px-4 py-3">
                  <div className="col-span-1 font-medium">#{friend.rank}</div>
                  <div className="col-span-5 flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{friend.name}</p>
                      <p className="text-sm text-muted-foreground">@{friend.username}</p>
                    </div>
                  </div>
                  <div className="col-span-2 text-right font-medium">{friend.xp.toLocaleString()} XP</div>
                  <div className="col-span-3 text-right">
                    <div className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      <TrophyIcon className="mr-1 h-3 w-3" />
                      {friend.streak} day streak
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-end">{getChangeIcon(friend.change)}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
