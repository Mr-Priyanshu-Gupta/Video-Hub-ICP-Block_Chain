import React, { useState } from 'react';
import { Search, Menu, Upload, Bell, User } from 'lucide-react';
import Button from '../UI/Button';

interface HeaderProps {
  onMenuToggle: () => void;
  onSearchSubmit: (query: string) => void;
  onAuthClick: () => void;
  currentUser: any;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, onSearchSubmit, onAuthClick, currentUser }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchQuery);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900 border-b border-gray-800 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="p-2 hover:bg-gray-800 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="text-white font-bold text-xl hidden sm:block">VideoHub</span>
          </div>
        </div>

        {/* Center search */}
        <div className="flex-1 max-w-2xl mx-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search videos, creators, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-full py-2 pl-4 pr-12 border border-gray-700 focus:border-orange-500 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-700 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95"
            >
              <Search className="w-4 h-4 text-gray-400" />
            </button>
          </form>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          {currentUser ? (
            <>
              {/* <Button variant="ghost" size="md" icon={Upload} className="hidden sm:grid" /> */}
              <Button variant="ghost" size="md" icon={Bell} className="relative">
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></span>
              </Button>
              <div className="w-8 h-8 rounded-full overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-110 cursor-pointer ring-2 ring-transparent hover:ring-orange-500">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.username}
                  className="w-full h-full object-cover"
                />
              </div>
            </>
          ) : (
            <Button onClick={onAuthClick} variant="primary" size="md" icon={User} iconPosition="left">
              <span className="hidden sm:block">Sign In</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;