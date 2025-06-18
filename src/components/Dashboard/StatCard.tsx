import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import type { LucideProps } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string;
  percentage: string;
  changeType: 'up' | 'down';
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  iconColor?: string;
  bgColor?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  percentage,
  changeType,
  icon: Icon,
  iconColor = 'text-primary',
  bgColor = 'bg-primary/10',
  className,
}) => {
  const percentageColor = changeType === 'up' ? 'text-success' : 'text-destructive';

  return (
    <Card className={cn('shadow-sm hover:shadow-md transition-shadow', className)}>
      <CardContent className="p-5 flex items-center space-x-4">
        <div className={cn('p-3 rounded-full', bgColor)}>
          <Icon className={cn('h-6 w-6', iconColor)} />
        </div>
        <div className="flex-grow">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{title}</p>
          <div className="flex items-baseline space-x-2 mt-1">
            <p className="text-2xl font-semibold text-foreground">{value}</p>
            <span className={cn('text-sm font-medium', percentageColor)}>
              {percentage}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
