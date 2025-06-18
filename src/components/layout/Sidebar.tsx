import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  ShieldCheck,
  PieChart as AnalyticsIcon, // Renamed to avoid conflict and be more descriptive
  Users as CrmIcon,
  ShoppingCart as EcommerceIcon,
  Bitcoin as CryptoIcon,
  Briefcase as ProjectsIcon,
  Image as NftIcon,
  ClipboardList as JobIcon,
  FileText as BlogIcon,
  Rocket,
  Wrench,
  Folder as FolderIcon, // Renamed for clarity
  Building2,
  Target as TargetIcon, // Renamed for clarity
  MapPin as MapPinIcon, // Renamed for clarity
  Share2 as ShareIcon, // Renamed for clarity
  LucideIcon
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
  active?: boolean; // This will be managed by state
}

const mainNavItems: NavItem[] = [
  { id: 'analytics', label: 'Analytics', icon: AnalyticsIcon, href: '#' },
  { id: 'crm', label: 'CRM', icon: CrmIcon, href: '#' },
  { id: 'ecommerce', label: 'Ecommerce', icon: EcommerceIcon, href: '#' },
  { id: 'crypto', label: 'Crypto', icon: CryptoIcon, href: '#' },
  { id: 'projects', label: 'Projects', icon: ProjectsIcon, href: '#' },
  { id: 'nft', label: 'NFT', icon: NftIcon, href: '#' },
  { id: 'job', label: 'Job', icon: JobIcon, href: '#' },
  { id: 'blog', label: 'Blog', icon: BlogIcon, href: '#', badge: 'New' },
];

const utilityNavItems: NavItem[] = [
  { id: 'launch', label: 'Launch', icon: Rocket, href: '#' },
  { id: 'tools', label: 'Tools', icon: Wrench, href: '#' },
  { id: 'files', label: 'Files', icon: FolderIcon, href: '#' },
  { id: 'company', label: 'Company', icon: Building2, href: '#' },
  { id: 'focus', label: 'Focus Mode', icon: TargetIcon, href: '#' },
  { id: 'location', label: 'Location', icon: MapPinIcon, href: '#' },
  { id: 'share', label: 'Share', icon: ShareIcon, href: '#' },
];

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [activeItemId, setActiveItemId] = useState<string>('crypto'); // Default active item

  const NavListItem: React.FC<{ item: NavItem; isActive: boolean; onClick: () => void }> = ({ item, isActive, onClick }) => (
    <li>
      <a
        href={item.href}
        onClick={(e) => {
          e.preventDefault(); // Prevent navigation for demo
          onClick();
        }}
        className={cn(
          'flex items-center space-x-3 p-2.5 rounded-md text-sm font-medium transition-colors',
          isActive
            ? 'bg-sidebar-border text-sidebar-foreground'
            : 'text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-border/50',
          'group'
        )}
      >
        <item.icon className={cn('h-5 w-5', isActive ? 'text-sidebar-foreground' : 'text-sidebar-foreground/70 group-hover:text-sidebar-foreground')} />
        <span className="flex-grow">{item.label}</span>
        {item.badge && (
          <Badge
            variant="default" 
            className="bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90 h-5 text-xs px-1.5 py-0.5"
          >
            {item.badge}
          </Badge>
        )}
      </a>
    </li>
  );

  return (
    <aside
      className={cn(
        'w-64 bg-sidebar text-sidebar-foreground flex flex-col h-screen sticky top-0 left-0 p-4 space-y-4 FONT_INTER_FIX',
        className
      )}
    >
      <div className="flex items-center justify-center h-16 shrink-0 mb-2">
        {/* Placeholder for actual logo image if available */}
        <ShieldCheck className="h-10 w-10 text-primary" />
        {/* <span className="ml-2 text-2xl font-bold text-sidebar-primary">VELZON</span> */}
      </div>

      <nav className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-sidebar-border scrollbar-track-sidebar">
        <ul className="space-y-1.5">
          {mainNavItems.map((item) => (
            <NavListItem 
              key={item.id} 
              item={item} 
              isActive={item.id === activeItemId} 
              onClick={() => setActiveItemId(item.id)}
            />
          ))}
        </ul>
      </nav>

      <div className="shrink-0 pt-4 border-t border-sidebar-border/50">
        <ul className="space-y-1.5">
          {utilityNavItems.map((item) => (
             <NavListItem 
              key={item.id} 
              item={item} 
              isActive={item.id === activeItemId} 
              onClick={() => setActiveItemId(item.id)}
            />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
