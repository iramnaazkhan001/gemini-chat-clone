'use client';

import { useState } from 'react';
import { Moon, Sun, Plus, Menu, X, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import useChatStore from '@/store/useChatStore';

interface HeaderProps {
  onCreateChatroom: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Header = ({ onCreateChatroom, onToggleSidebar, isSidebarOpen }: HeaderProps) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isDarkMode, setIsDarkMode, user, logout } = useChatStore();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Gemini Chat
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCreateChatroom}
            className="hidden sm:flex"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onCreateChatroom}
            className="sm:hidden"
          >
            <Plus className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.phoneNumber.slice(-2)}
                </span>
              </div>
            </Button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 py-1 z-50">
                <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-600">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.countryCode}{user?.phoneNumber}
                  </p>
                </div>
                
                
                <button
                  onClick={handleLogout}
                  className="w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};