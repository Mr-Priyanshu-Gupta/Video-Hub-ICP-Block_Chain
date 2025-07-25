import React from 'react';
import { Home, TrendingUp, Clock, ThumbsUp, PlaySquare, Settings, LogOut } from 'lucide-react';
import Button from '../UI/Button';

interface SidebarProps {
  isOpen: boolean;
  currentUser: any;
  onPageChange: (page: string) => void;
  onLogout: () => void;
  activePage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, currentUser, onPageChange, onLogout, activePage }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'watchlater', label: 'Watch Later', icon: Clock },
    { id: 'liked', label: 'Liked Videos', icon: ThumbsUp },
    { id: 'playlists', label: 'Playlists', icon: PlaySquare },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => onPageChange(activePage)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] bg-gray-900 border-r border-gray-800 z-40
        transition-transform duration-700 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x--1 lg:block lg:top-15 lg:h-full
        w-64
      `}>
        <div className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                variant={activePage === item.id ? 'primary' : 'ghost'}
                size="md"
                icon={Icon}
                iconPosition="left"
                fullWidth
                className="justify-start"
              >
                <span>{item.label}</span>
              </Button>
            );
          })}
          
          {currentUser && (
            <>
              <hr className="border-gray-700 my-4" />
              <Button
                onClick={() => onPageChange('profile')}
                variant={activePage === 'profile' ? 'primary' : 'ghost'}
                size="md"
                fullWidth
                className="justify-start"
              >
                <div className="w-5 h-5 rounded-full overflow-hidden ring-2 ring-transparent hover:ring-orange-500 transition-all duration-300">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>Your Channel</span>
              </Button>
              
              <Button
                onClick={() => onPageChange('settings')}
                variant={activePage === 'settings' ? 'primary' : 'ghost'}
                size="md"
                icon={Settings}
                iconPosition="left"
                fullWidth
                className="justify-start"
              >
                <span>Settings</span>
              </Button>
              
              <Button
                onClick={onLogout}
                variant="danger"
                size="md"
                icon={LogOut}
                iconPosition="left"
                fullWidth
                className="justify-start"
              >
                <span>Sign Out</span>
              </Button>
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;