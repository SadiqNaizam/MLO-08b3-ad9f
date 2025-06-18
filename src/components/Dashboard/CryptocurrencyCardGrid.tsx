import React from 'react';
import { cn } from '@/lib/utils';
import CryptocurrencyCard, { CryptocurrencyCardProps } from './CryptocurrencyCard';
import { Bitcoin, Gem, Coins, Shield, Activity } from 'lucide-react'; // Using generic icons

interface CryptocurrencyCardGridProps {
  className?: string;
}

const generateRandomChartData = (points = 10, min = 50, max = 100) => {
  return Array.from({ length: points }, () => ({
    value: Math.floor(Math.random() * (max - min + 1)) + min,
  }));
};

const cryptoData: CryptocurrencyCardProps[] = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    value: '$1,523,647',
    percentage: '+13.11%',
    changeType: 'up' as const,
    icon: Bitcoin,
    iconColor: 'text-yellow-500',
    chartData: generateRandomChartData(12, 1400, 1600).map((v, i) => ({name: `p${i}`, value: v.value})),
    chartColor: 'hsl(var(--success))',
  },
  {
    name: 'Litecoin',
    symbol: 'LTC',
    value: '$2,145,687',
    percentage: '+15.08%',
    changeType: 'up' as const,
    icon: Coins,
    iconColor: 'text-blue-400',
    chartData: generateRandomChartData(12, 2000, 2200).map((v, i) => ({name: `p${i}`, value: v.value})),
    chartColor: 'hsl(var(--success))',
  },
  {
    name: 'Ethereum',
    symbol: 'ETC', // Should be ETH in image, but data uses ETC
    value: '$3,312,870',
    percentage: '+08.57%',
    changeType: 'up' as const,
    icon: Gem,
    iconColor: 'text-purple-500',
    chartData: generateRandomChartData(12, 3200, 3400).map((v, i) => ({name: `p${i}`, value: v.value})),
    chartColor: 'hsl(var(--success))',
  },
  {
    name: 'Binance',
    symbol: 'BNB',
    value: '$1,820,045',
    percentage: '-09.21%',
    changeType: 'down' as const,
    icon: Shield,
    iconColor: 'text-orange-400',
    chartData: generateRandomChartData(12, 1700, 1900).map((v, i) => ({name: `p${i}`, value: v.value})),
    chartColor: 'hsl(var(--destructive))',
  },
  {
    name: 'Dash',
    symbol: 'DASH',
    value: '$9,458,153',
    percentage: '+12.07%',
    changeType: 'up' as const,
    icon: Activity, // Used Activity for Dash
    iconColor: 'text-sky-500',
    chartData: generateRandomChartData(12, 9300, 9600).map((v, i) => ({name: `p${i}`, value: v.value})),
    chartColor: 'hsl(var(--success))',
  },
];

const CryptocurrencyCardGrid: React.FC<CryptocurrencyCardGridProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4', className)}>
      {cryptoData.map((crypto) => (
        <CryptocurrencyCard
          key={crypto.symbol}
          name={crypto.name}
          symbol={crypto.symbol}
          value={crypto.value}
          percentage={crypto.percentage}
          changeType={crypto.changeType}
          icon={crypto.icon}
          iconColor={crypto.iconColor}
          chartData={crypto.chartData}
          chartColor={crypto.chartColor}
        />
      ))}
    </div>
  );
};

export default CryptocurrencyCardGrid;
