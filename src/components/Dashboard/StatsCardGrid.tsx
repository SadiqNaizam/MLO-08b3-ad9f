import React from 'react';
import { cn } from '@/lib/utils';
import StatCard, { StatCardProps } from './StatCard';
import { CircleDollarSign, ArrowUpCircle, ArrowDownCircle, TrendingUp } from 'lucide-react';

interface StatsCardGridProps {
  className?: string;
}

const statsData: StatCardProps[] = [
  {
    title: 'TOTAL INVESTED',
    value: '$2,390.68',
    percentage: '+6.24%',
    changeType: 'up' as const,
    icon: CircleDollarSign,
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  {
    title: 'TOTAL CHANGE',
    value: '$19,523.25',
    percentage: '+3.67%',
    changeType: 'up' as const,
    icon: ArrowUpCircle,
    iconColor: 'text-green-500',
    bgColor: 'bg-green-500/10'
  },
  {
    title: 'DAY CHANGE',
    value: '$14,799.44',
    percentage: '-4.80%',
    changeType: 'down' as const,
    icon: ArrowDownCircle,
    iconColor: 'text-red-500',
    bgColor: 'bg-red-500/10'
  },
  {
    title: 'TOTAL ASSETS',
    value: '12.5 BTC',
    percentage: '+1.5% (24h)',
    changeType: 'up' as const,
    icon: TrendingUp,
    iconColor: 'text-purple-500',
    bgColor: 'bg-purple-500/10'
  },
];

const StatsCardGrid: React.FC<StatsCardGridProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6', className)}>
      {statsData.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          percentage={stat.percentage}
          changeType={stat.changeType}
          icon={stat.icon}
          iconColor={stat.iconColor}
          bgColor={stat.bgColor}
        />
      ))}
    </div>
  );
};

export default StatsCardGrid;
