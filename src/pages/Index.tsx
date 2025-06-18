import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import PageHeader from '@/components/Dashboard/PageHeader';
import StatsCardGrid from '@/components/Dashboard/StatsCardGrid';
import PortfolioOverview from '@/components/Dashboard/PortfolioOverview';
import MarketGraph from '@/components/Dashboard/MarketGraph';
import CryptocurrencyCardGrid from '@/components/Dashboard/CryptocurrencyCardGrid';
import { cn } from '@/lib/utils';

const IndexPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true); // Default to open for desktop

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div 
      className={cn(
        "grid h-screen bg-background text-foreground",
        // Defines two columns: first for sidebar, second for main area.
        // First column width is 'auto', determined by its content (the sidebar wrapper).
        // Second column takes remaining space (1fr).
        // Defines two rows: first for header, second for main content.
        // First row height is 'auto', determined by Header component (h-16).
        // Second row takes remaining vertical space (1fr).
        "grid-cols-[auto_1fr] grid-rows-[auto_1fr]"
      )}
    >
      {/* Sidebar Area: Positioned in Column 1, Row 1, and spans 2 rows. */}
      <div 
        className={cn(
          "col-start-1 row-start-1 row-span-2 transition-all duration-300 ease-in-out",
          // This div's width sets the effective width of the 'auto' grid column.
          isSidebarOpen ? "w-64" : "w-0 overflow-hidden"
        )}
      >
        {/* The Sidebar component itself is w-64 and h-screen (internally).
            Render it only when its container (and thus the grid column) has width. */}
        {isSidebarOpen && <Sidebar />}
      </div>
      
      {/* Header Area: Positioned in Column 2, Row 1. */}
      {/* The Header component handles its own height (h-16) and sticky behavior (z-50). */}
      <Header 
        onToggleSidebar={toggleSidebar} 
        className="col-start-2 row-start-1" 
      />

      {/* Main Content Area: Positioned in Column 2, Row 2. */}
      {/* Handles its own scrolling. p-6 for padding, space-y-6 for spacing between direct children. */}
      <main className="col-start-2 row-start-2 overflow-y-auto p-6 space-y-6">
        <PageHeader
          title="CRYPTO"
          breadcrumbs={[
            { label: 'Dashboards', href: '#' },
            { label: 'Crypto' },
          ]}
        />

        <StatsCardGrid />

        {/* Section for PortfolioOverview and MarketGraph, laid out in two columns on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PortfolioOverview />
          <MarketGraph />
        </div>

        <CryptocurrencyCardGrid />
      </main>
    </div>
  );
};

export default IndexPage;
