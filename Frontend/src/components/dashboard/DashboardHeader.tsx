import { memo } from 'react';
import ShinyText from '@/components/Custom/ShinyText';
import { getGreeting } from './MagicBento';

interface DashboardHeaderProps {
  userName: string;
}

export const DashboardHeader = memo<DashboardHeaderProps>(({ userName }) => {
  return (
    <div className="mb-4">
      <div className="flex-1">
        <h1 className="text-xl md:text-3xl">
          <ShinyText 
            text={`${getGreeting()}, ${userName}`}
            className="text-xl md:text-3xl"
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
  );
});

DashboardHeader.displayName = 'DashboardHeader';