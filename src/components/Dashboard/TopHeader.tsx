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
import { Search, Bell, Settings, Grid3x3, Moon, Maximize, User, LogOut, Sun } from 'lucide-react';

interface TopHeaderProps {
  className?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ className }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isFullScreen, setIsFullScreen] = React.useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you'd also toggle a class on the body or use a theme provider
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
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

  return (
    <header className={cn('flex items-center justify-between h-16 bg-card text-card-foreground px-6 border-b', className)}>
      <div className="flex items-center">
        {/* Hamburger for mobile, or logo part if needed - not specified, so keeping it simple */}
        {/* VELZON logo text or image could go here */}
        <div className="relative ml-4 md:ml-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="pl-10 pr-4 py-2 h-9 w-full md:w-64 bg-background" />
        </div>
      </div>

      <div className="flex items-center space-x-3 md:space-x-4">
        <Button variant="ghost" size="icon" className="hidden md:inline-flex">
          <Grid3x3 className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-start space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://avatar.vercel.sh/random1" alt="User" />
                <AvatarFallback>U1</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">New order received</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-start space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://avatar.vercel.sh/random2" alt="User" />
                <AvatarFallback>U2</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Password Change Request</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <Button variant="ghost" size="icon" onClick={toggleFullScreen} className="hidden md:inline-flex">
          {isFullScreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://avatar.vercel.sh/anna" alt="Anna Adame" />
                <AvatarFallback>AA</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium">Anna Adame</span>
                <span className="text-xs text-muted-foreground">Founder</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
