import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/layout/Header';
import {
  Shield,
  Users,
  UserCheck,
  Settings,
  LogOut,
  Crown
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/superadmin/dashboard', icon: Shield },
  { name: 'Admins', href: '/superadmin/admins', icon: Users },
  { name: 'Trainees', href: '/superadmin/trainees', icon: UserCheck },
  { name: 'Settings', href: '/superadmin/settings', icon: Settings },
];

export default function SuperAdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getPageTitle = () => {
    const currentPath = location.pathname;
    const currentNav = navigation.find(item => item.href === currentPath);
    return currentNav?.name || 'Dashboard';
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-linear duration-300 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div className={`fixed inset-y-0 left-0 flex flex-col w-64 bg-white transform transition-transform ease-in-out duration-300 z-50 md:hidden ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <div className={`hidden md:flex md:flex-shrink-0 transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'md:w-64' : 'md:w-0'
      }`}>
        <div className={`flex flex-col w-64 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <SidebarContent />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Header */}
        <Header
          user={user}
          pageTitle={getPageTitle()}
          onToggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
          showSearch={true}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );

  function SidebarContent() {
    return (
      <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white shadow-lg">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <div className="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <Crown className="h-5 w-5 text-white" />
            </div>
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">Super Admin</span>
          </div>
          <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-900 shadow-sm border-l-4 border-purple-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
                    }`
                  }
                >
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <button
            onClick={logout}
            className="flex-shrink-0 w-full group block hover:bg-red-50 rounded-lg p-2 transition-colors"
          >
            <div className="flex items-center">
              <LogOut className="inline-block h-5 w-5 text-gray-400 group-hover:text-red-500 mr-3 transition-colors" />
              <div className="text-sm font-medium text-gray-700 group-hover:text-red-600 transition-colors">
                Sign out
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  }
}