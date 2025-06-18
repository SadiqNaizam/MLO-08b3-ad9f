import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Flag as FlagIcon,
  Grid3x3 as AppsIcon,
  Bell as BellIcon,
  Moon as MoonIcon,
  Sun as SunIcon,
  Maximize as MaximizeIcon,
  Minimize as MinimizeIcon,
  User as UserIcon,
  Settings as SettingsIcon,
  LogOut as LogOutIcon,
} from 'lucide-react';

interface HeaderProps {
  className?: string;
  onToggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ className, onToggleSidebar }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isFullScreen, setIsFullScreen] = React.useState(false);

  React.useEffect(() => {
    const updateMode = () => {
      if (document.documentElement.classList.contains('dark')) {
        setIsDarkMode(true);
      } else {
        setIsDarkMode(false);
      }
    };
    updateMode(); // Initial check
    const observer = new MutationObserver(updateMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  const notificationItems = [
    {
      id: '1',
      avatarSrc: 'https://avatar.vercel.sh/random1',
      fallback: 'U1',
      title: 'New order received',
      time: '2 minutes ago',
    },
    {
      id: '2',
      avatarSrc: 'https://avatar.vercel.sh/random2',
      fallback: 'U2',
      title: 'Password Change Request',
      time: '1 hour ago',
    },
    {
      id: '3',
      avatarSrc: 'https://avatar.vercel.sh/random3',
      fallback: 'S1',
      title: 'Server #1 is critical!',
      time: '4 hours ago',
    },
  ];

  return (
    <header
      className={cn(
        'flex items-center justify-between h-16 px-4 md:px-6 sticky top-0 z-50',
        'bg-primaryText text-white border-b border-sidebar-border FONT_INTER_FIX',
        className
      )}
    >
      <div className="flex items-center space-x-2 md:space-x-4">
        {onToggleSidebar && (
          <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="text-white hover:bg-white/10 hover:text-white">
            <MenuIcon className="h-6 w-6" />
          </Button>
        )}
        <span className="text-xl md:text-2xl font-bold text-white hidden sm:inline">VELZON</span>
        <div className="relative hidden md:block">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            type="search" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 h-9 w-full md:w-60 lg:w-72 bg-black/20 border-gray-600 text-gray-200 placeholder-gray-400 focus:bg-black/30 focus:border-primary focus-visible:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center space-x-1 md:space-x-2">
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white hidden sm:inline-flex">
          <FlagIcon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white hidden sm:inline-flex">
          <AppsIcon className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10 hover:text-white">
              <BellIcon className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 md:w-96 bg-card text-card-foreground mt-2">
            <DropdownMenuLabel className="flex justify-between items-center">
              <span>Notifications</span> 
              <Badge variant="outline" className="text-xs">{notificationItems.length} New</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              {notificationItems.map(notif => (
                <DropdownMenuItem key={notif.id} className="flex items-start space-x-3 p-3 hover:bg-accent">
                  <Avatar className="h-8 w-8 mt-0.5">
                    {notif.avatarSrc && <AvatarImage src={notif.avatarSrc} alt="User" />}
                    <AvatarFallback>{notif.fallback}</AvatarFallback>
                  </Avatar>
                  <div className='w-full'>
                    <p className="text-sm font-medium text-card-foreground truncate">{notif.title}</p>
                    <p className="text-xs text-muted-foreground">{notif.time}</p>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-primary hover:text-primary py-2">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="text-white hover:bg-white/10 hover:text-white">
          {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </Button>

        <Button variant="ghost" size="icon" onClick={toggleFullScreen} className="text-white hover:bg-white/10 hover:text-white hidden md:inline-flex">
          {isFullScreen ? <MinimizeIcon className="h-5 w-5" /> : <MaximizeIcon className="h-5 w-5" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 px-1 md:px-2 h-10 text-white hover:bg-white/10 hover:text-white">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://avatar.vercel.sh/anna" alt="Anna Adame" />
                <AvatarFallback className='text-black'>AA</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium text-white">Anna Adame</span>
                <span className="text-xs text-gray-300">Founder</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-card text-card-foreground mt-2">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-accent">
              <UserIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-accent">
              <SettingsIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-accent text-destructive focus:bg-destructive/10 focus:text-destructive">
              <LogOutIcon className="mr-2 h-4 w-4" /> 
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
