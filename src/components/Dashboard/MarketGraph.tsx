import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';

interface MarketGraphProps {
  className?: string;
}

// Generate more complex and realistic OHLC data
const generateCandlestickData = (numPoints: number) => {
  const data = [];
  let lastClose = Math.random() * 100 + 50; // Start with a random price
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - numPoints);

  for (let i = 0; i < numPoints; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const open = lastClose * (1 + (Math.random() - 0.5) * 0.05); // +/- 5% of last close
    const close = open * (1 + (Math.random() - 0.5) * 0.1); // +/- 10% of open for more volatility
    const high = Math.max(open, close) * (1 + Math.random() * 0.05); // up to 5% higher
    const low = Math.min(open, close) * (1 - Math.random() * 0.05); // up to 5% lower
    
    data.push({
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) + ' ' + date.toLocaleDateString('en-GB', {day: '2-digit', month: 'short'}),
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
    });
    lastClose = close;
  }
  return data;
};


const initialMarketData = generateCandlestickData(60); // Generate 60 data points

const MarketGraph: React.FC<MarketGraphProps> = ({ className }) => {
  const [timeFilter, setTimeFilter] = React.useState<'1H' | '7D' | '1M' | '1Y' | 'ALL'>('1M');
  const [marketData, setMarketData] = React.useState(initialMarketData);

  // Placeholder for data fetching based on filter
  React.useEffect(() => {
    // In a real app, fetch data based on timeFilter
    // For this demo, we'll just slice the data or regenerate it
    let points = 60;
    if (timeFilter === '1H') points = 12; // e.g., 5-min intervals for 1 hour
    else if (timeFilter === '7D') points = 7 * 24 / 4; // e.g. 4-hour intervals for 7 days
    else if (timeFilter === '1M') points = 30;
    else if (timeFilter === '1Y') points = 52; // weekly
    else if (timeFilter === 'ALL') points = 100;
    setMarketData(generateCandlestickData(points));
  }, [timeFilter]);

  const filters: Array<'1H' | '7D' | '1M' | '1Y' | 'ALL'> = ['1H', '7D', '1M', '1Y', 'ALL'];

  // Custom Tooltip for better styling
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card p-3 rounded-md shadow-lg border border-border">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-xs">Open: <span className="font-semibold">{data.open}</span></p>
          <p className="text-xs">High: <span className="font-semibold text-green-500">{data.high}</span></p>
          <p className="text-xs">Low: <span className="font-semibold text-red-500">{data.low}</span></p>
          <p className="text-xs">Close: <span className="font-semibold">{data.close}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={cn('shadow-sm', className)}>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <CardTitle className="text-lg font-medium mb-2 sm:mb-0">Market Graph</CardTitle>
          <div className="flex space-x-1">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={timeFilter === filter ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeFilter(filter)}
                className="h-7 px-2 text-xs"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
            <div className="flex items-baseline space-x-2">
                <span className="text-sm font-semibold text-foreground">0.014756</span>
                <span className="text-xs text-muted-foreground">$75.69</span>
                <span className="text-xs text-success">+1.99%</span>
                <span className="text-xs text-muted-foreground ml-2">High <span className="text-foreground">0.014578</span></span>
                <span className="text-xs text-muted-foreground ml-1">Low <span className="text-foreground">0.0175489</span></span>
            </div>
            <div className="flex space-x-4 mt-2 sm:mt-0">
                <div>Total Balance: <span className="font-semibold text-foreground">$72.8k</span></div>
                <div>Profit: <span className="font-semibold text-success">+$49.7k</span></div>
                <div>Loss: <span className="font-semibold text-destructive">-$23.1k</span></div>
            </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2 pb-4 h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={marketData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="time" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={{ stroke: 'hsl(var(--border))' }} tickLine={{ stroke: 'hsl(var(--border))' }} />
            <YAxis orientation="right" tickFormatter={(value) => `$${value.toFixed(0)}`} tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={{ stroke: 'hsl(var(--border))' }} tickLine={{ stroke: 'hsl(var(--border))' }} />
            <Tooltip content={<CustomTooltip />} />
            {/* Candlestick simulation: Bar for body, Lines for wicks */}
            {marketData.map((entry, index) => (
              <React.Fragment key={`candle-${index}`}>
                {/* Wick */}
                <Line dataKey="high" strokeWidth={1} stroke={entry.close >= entry.open ? 'hsl(var(--success))' : 'hsl(var(--destructive))'} dot={false} isAnimationActive={false} connectNulls={false} points={[{x: entry.time, y: entry.low}, {x: entry.time, y: entry.high}]}  />
                {/* Body */}
                <Bar dataKey="close" fill={entry.close >= entry.open ? 'hsl(var(--success))' : 'hsl(var(--destructive))'} barSize={6} isAnimationActive={false} shape={(props: any) => {
                    const { x, y, width, height, payload } = props;
                    const actualY = payload.close >= payload.open ? y : y + height; 
                    const actualHeight = Math.abs(payload.open - payload.close) / (payload.high - payload.low) * height;
                    return <rect x={x} y={actualY} width={width} height={actualHeight} fill={props.fill} />;
                }}/>
              </React.Fragment>
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MarketGraph;
