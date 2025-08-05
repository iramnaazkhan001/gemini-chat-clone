'use client';

import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { LoginForm } from '@/components/auth/LoginForm';
import { Header } from '@/components/layout/Header';
import { ChatroomList } from '@/components/chat/ChatroomList';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { CreateChatroomModal } from '@/components/modals/CreateChatroomModal';
import useChatStore from '@/store/useChatStore';

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { user, initializeApp } = useChatStore();

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  const handleCreateChatroom = () => {
    setIsCreateModalOpen(true);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!user?.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <LoginForm />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            className: 'dark:bg-gray-800 dark:text-white',
          }}
        />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header
        onCreateChatroom={handleCreateChatroom}
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className={`
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:relative lg:block
          absolute inset-y-0 left-0 z-40
          w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
          transition-transform duration-300 ease-in-out
        `}>
          <ChatroomList onCreateChatroom={handleCreateChatroom} />
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <ChatWindow />
        </div>
      </div>

      <CreateChatroomModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          className: 'dark:bg-gray-800 dark:text-white',
        }}
      />
    </div>
  );
}