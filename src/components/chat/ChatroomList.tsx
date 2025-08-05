'use client';

import { useState, useMemo } from 'react';
import { Search, MessageCircle, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ChatroomListSkeleton } from '@/components/ui/LoadingSkeleton';
import useChatStore from '@/store/useChatStore';
import { formatDistanceToNow } from '@/utils/dateUtils';

interface ChatroomListProps {
  onCreateChatroom: () => void;
}

export const ChatroomList = ({ onCreateChatroom }: ChatroomListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    chatrooms,
    currentChatroom,
    setCurrentChatroom,
    deleteChatroom,
    isLoading,
  } = useChatStore();

  const filteredChatrooms = useMemo(() => {
    if (!searchQuery.trim()) return chatrooms;
    
    return chatrooms.filter(chatroom =>
      chatroom.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [chatrooms, searchQuery]);

  const handleDeleteChatroom = (e: React.MouseEvent, chatroomId: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this chatroom?')) {
      deleteChatroom(chatroomId);
    }
  };

  if (isLoading) {
    return <ChatroomListSkeleton />;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <Button
          onClick={onCreateChatroom}
          className="w-full"
          variant="outline"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Chatroom
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredChatrooms.length === 0 ? (
          <div className="p-4 text-center">
            {searchQuery ? (
              <div className="text-gray-500 dark:text-gray-400">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No chats found for "{searchQuery}"</p>
              </div>
            ) : (
              <div className="text-gray-500 dark:text-gray-400">
                <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No chats yet</p>
                <p className="text-sm mt-1">Create your first chatroom to get started</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredChatrooms.map((chatroom) => (
              <div
                key={chatroom.id}
                onClick={() => setCurrentChatroom(chatroom.id)}
                className={`group relative p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  currentChatroom === chatroom.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500'
                    : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate">
                      {chatroom.title}
                    </h3>
                    {chatroom.lastMessage && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                        {chatroom.lastMessage.sender === 'ai' ? 'Gemini: ' : 'You: '}
                        {chatroom.lastMessage.content}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {formatDistanceToNow(chatroom.updatedAt)}
                    </p>
                  </div>

                  <button
                    onClick={(e) => handleDeleteChatroom(e, chatroom.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-all duration-200"
                    aria-label="Delete chatroom"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {chatroom.messages.length > 0 && (
                  <div className="absolute top-3 right-8">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};