import React from 'react';
import { Bell, Search, Menu, Crown, Shield, User } from 'lucide-react';

interface HeaderProps {
  user: {
    name?: string;
    role: 'trainee' | 'admin' | 'superadmin';
  } | null;
  pageTitle: string;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
  showSearch?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function Header({ 
  user, 
  pageTitle, 
  onToggleSidebar, 
  sidebarOpen, 
  showSearch = false,
  searchQuery = '',
  onSearchChange 
}: HeaderProps) {
  const getRoleIcon = () => {
    switch (user?.role) {
      case 'superadmin':
        return <Crown className="h-4 w-4 text-white" />;
      case 'admin':
        return <Shield className="h-4 w-4 text-white" />;
      default:
        return <User className="h-4 w-4 text-white" />;
    }
  };

  const getRoleColor = () => {
    switch (user?.role) {
      case 'superadmin':
        return 'bg-purple-600';
      case 'admin':
        return 'bg-green-600';
      default:
        return 'bg-blue-600';
    }
  };

  const getRoleTitle = () => {
    switch (user?.role) {
      case 'superadmin':
        return 'Super Administrator';
      case 'admin':
        return 'Administrator';
      default:
        return 'Trainee';
    }
  };

  const getFocusRingColor = () => {
    switch (user?.role) {
      case 'superadmin':
        return 'focus:ring-purple-500';
      case 'admin':
        return 'focus:ring-green-500';
      default:
        return 'focus:ring-blue-500';
    }
  };

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-lg border-b border-gray-200">
      {/* Hamburger menu button */}
      <button
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 hover:bg-gray-50 transition-all duration-200"
        onClick={onToggleSidebar}
      >
        <div className="relative w-6 h-6">
          <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
            sidebarOpen ? 'rotate-45 translate-y-2' : 'translate-y-0'
          }`} />
          <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out translate-y-2 ${
            sidebarOpen ? 'opacity-0' : 'opacity-100'
          }`} />
          <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
            sidebarOpen ? '-rotate-45 translate-y-2' : 'translate-y-4'
          }`} />
        </div>
      </button>
      
      <div className="flex-1 px-4 flex justify-between items-center">
        <div className="flex-1 flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mr-4">
            {pageTitle}
          </h1>
          {showSearch && (
            <div className="max-w-lg w-full lg:max-w-xs">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className={`block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:border-transparent text-sm transition-all duration-200 ${getFocusRingColor()}`}
                  placeholder="Search..."
                  type="search"
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="ml-4 flex items-center md:ml-6 space-x-4">
          {/* Notification Bell */}
          <button className={`relative p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 hover:bg-gray-100 ${getFocusRingColor()}`}>
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
          </button>
          
          {/* User Profile */}
          <div className="relative">
            <div className="flex items-center space-x-3 bg-gray-50 rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex-shrink-0">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shadow-md ${getRoleColor()}`}>
                  {getRoleIcon()}
                </div>
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-700">{user?.name}</div>
                <div className="text-xs text-gray-500">{getRoleTitle()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}