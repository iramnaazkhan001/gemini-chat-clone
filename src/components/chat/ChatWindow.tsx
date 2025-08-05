'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, ArrowDown } from 'lucide-react';
import { MessageItem } from './MessageItem';
import { MessageInput } from './MessageInput';
import { TypingIndicator } from './TypingIndicator';
import { MessageSkeleton } from '@/components/ui/LoadingSkeleton';
import { Button } from '@/components/ui/Button';
import useChatStore from '@/store/useChatStore';

export const ChatWindow = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const {
    chatrooms,
    currentChatroom,
    addMessage,
    isTyping,
    setIsTyping,
  } = useChatStore();

  const currentChat = chatrooms.find(c => c.id === currentChatroom);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    
    setShowScrollButton(!isNearBottom);

    // Simulate infinite scroll loading
    if (scrollTop === 0 && currentChat?.messages.length && currentChat.messages.length > 10) {
      if (!isLoadingMore) {
        setIsLoadingMore(true);
        setTimeout(() => {
          setIsLoadingMore(false);
        }, 1000);
      }
    }
  };

  const handleSendMessage = (content: string, image?: string) => {
    if (!currentChatroom) return;

    addMessage(currentChatroom, content, image);
    setIsTyping(true);
    
    // Auto scroll to bottom after sending
    setTimeout(scrollToBottom, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [currentChat, isLoadingMore]);

  if (!currentChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">Welcome to Gemini Chat</h3>
          <p>Select a chatroom or create a new one to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Chat Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
          {currentChat.title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {currentChat.messages.length} messages
        </p>
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 relative messages-container"
      >
        {isLoadingMore && (
          <div className="mb-4">
            <MessageSkeleton count={2} />
          </div>
        )}

        {currentChat.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No messages yet</p>
              <p className="text-sm mt-1">Start a conversation with Gemini!</p>
            </div>
          </div>
        ) : (
          currentChat.messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))
        )}

        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />

        {/* Scroll to bottom button */}
        {showScrollButton && (
          <Button
            onClick={scrollToBottom}
            className="fixed bottom-24 right-6 rounded-full w-12 h-12 p-0 shadow-lg z-10"
            aria-label="Scroll to bottom"
          >
            <ArrowDown className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Message Input */}
      <MessageInput
        onSendMessage={handleSendMessage}
        disabled={isTyping}
      />
    </div>
  );
};