import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Bitcoin, Gem, Coins, HelpCircle, MoreHorizontal } from 'lucide-react'; // Using HelpCircle for Dash as a placeholder

interface PortfolioOverviewProps {
  className?: string;
}

const pieData = [
  { name: 'Bitcoin', value: 40, color: '#f7931a' }, // Orange
  { name: 'Ethereum', value: 30, color: '#627eea' }, // Purple-blue
  { name: 'Litecoin', value: 15, color: '#345d9d' }, // Darker blue
  { name: 'Dash', value: 10, color: '#008de4' },    // Bright blue
  { name: 'Others', value: 5, color: '#bdbdbd' },    // Grey
];

const portfolioListData = [
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    amount: '0.00584875',
    fiatValue: '$19,405.12',
    color: 'bg-yellow-500',
    icon: Bitcoin,
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    amount: '2.25842108',
    fiatValue: '$40,552.18',
    color: 'bg-purple-500',
    icon: Gem,
  },
  {
    id: 'ltc',
    name: 'Litecoin',
    symbol: 'LTC',
    amount: '10.58963217',
    fiatValue: '$15,824.58',
    color: 'bg-blue-400',
    icon: Coins,
  },
  {
    id: 'dash',
    name: 'Dash',
    symbol: 'DASH',
    amount: '204.28565885',
    fiatValue: '$30,635.84',
    color: 'bg-sky-500',
    icon: HelpCircle, // Placeholder, Dash has specific logo
  },
];

const PortfolioOverview: React.FC<PortfolioOverviewProps> = ({ className }) => {
  const [selectedCurrency, setSelectedCurrency] = React.useState<string>('btc');

  return (
    <Card className={cn('shadow-sm', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">My Portfolio</CardTitle>
        <Select defaultValue="btc" onValueChange={setSelectedCurrency} value={selectedCurrency}>
          <SelectTrigger className="w-[100px] h-8">
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="btc">BTC</SelectItem>
            <SelectItem value="usd">USD</SelectItem>
            <SelectItem value="eur">EUR</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--border))' }}
              />
              {/* Custom Legend to match image's center text */}
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center -mt-16">
            <p className="text-xs text-muted-foreground">Total Value</p>
            <p className="text-2xl font-bold text-foreground">$106,416</p>
          </div>
        </div>
        <div className="space-y-4">
          {portfolioListData.map((item) => {
            const Icon = item.icon;
            return (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className={cn('h-2.5 w-2.5 rounded-full', item.color)} />
                <div>
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  {item.symbol} {item.amount}
                </p>
                <p className="text-xs text-muted-foreground">{item.fiatValue}</p>
              </div>
            </div>
          )})}
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioOverview;
