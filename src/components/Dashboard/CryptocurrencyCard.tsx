import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, TrendingUp, TrendingDown } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';

export interface CryptocurrencyCardProps {
  name: string;
  symbol: string;
  value: string;
  percentage: string;
  changeType: 'up' | 'down';
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  iconColor?: string;
  chartData: Array<{ name?: string; value: number }>;
  chartColor?: string;
  className?: string;
}

const CryptocurrencyCard: React.FC<CryptocurrencyCardProps> = ({
  name,
  symbol,
  value,
  percentage,
  changeType,
  icon: Icon,
  iconColor = 'text-foreground',
  chartData,
  chartColor,
  className,
}) => {
  const percentageColor = changeType === 'up' ? 'text-success' : 'text-destructive';
  const TrendIcon = changeType === 'up' ? TrendingUp : TrendingDown;
  const effectiveChartColor = chartColor || (changeType === 'up' ? 'hsl(var(--success))' : 'hsl(var(--destructive))');

  return (
    <Card className={cn('shadow-sm hover:shadow-md transition-shadow', className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon className={cn('h-7 w-7', iconColor)} />
            <div>
              <p className="text-sm font-medium text-foreground">{name}</p>
              <p className="text-xs text-muted-foreground">{symbol}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 text-muted-foreground hover:text-foreground">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Trade</DropdownMenuItem>
              <DropdownMenuItem>Remove from Watchlist</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mb-3">
          <p className="text-xl font-semibold text-foreground">{value}</p>
          <div className={cn('flex items-center text-xs font-medium', percentageColor)}>
            <TrendIcon className="h-3 w-3 mr-1" />
            <span>{percentage} ({symbol})</span>
          </div>
        </div>

        <div className="h-16 -mx-2"> {/* Negative margin to make chart extend a bit */} 
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))', 
                  borderRadius: 'var(--radius)',
                  padding: '4px 8px' 
                }}
                itemStyle={{ fontSize: '10px' }}
                labelStyle={{ display: 'none' }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, null]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={effectiveChartColor}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptocurrencyCard;
