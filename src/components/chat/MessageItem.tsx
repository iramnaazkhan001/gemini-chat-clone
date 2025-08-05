'use client';

import { useState } from 'react';
import { Copy, Check, User, Bot } from 'lucide-react';
import { Message } from '@/types';
import { formatTime } from '@/utils/dateUtils';
import toast from 'react-hot-toast';

interface MessageItemProps {
  message: Message;
}

export const MessageItem = ({ message }: MessageItemProps) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === 'user';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      toast.success('Message copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy message');
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 group`}>
      <div className={`max-w-xs lg:max-w-md relative ${isUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`rounded-2xl px-4 py-2 shadow-sm ${
            isUser
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
          }`}
        >
          <div className="flex items-start space-x-2 mb-2">
            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
              isUser ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
            }`}>
              {isUser ? (
                <User className="h-3 w-3 text-white" />
              ) : (
                <Bot className="h-3 w-3 text-gray-600 dark:text-gray-300" />
              )}
            </div>
            <span className={`text-xs font-medium ${
              isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
            }`}>
              {isUser ? 'You' : 'Gemini'}
            </span>
          </div>

          {message.image && (
            <div className="mb-2">
              <img
                src={message.image}
                alt="Uploaded image"
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          )}

          <p className="whitespace-pre-wrap break-words">{message.content}</p>

          <div className="flex items-center justify-between mt-2">
            <span className={`text-xs ${
              isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
            }`}>
              {formatTime(message.timestamp)}
            </span>

            <button
              onClick={handleCopy}
              className={`opacity-0 group-hover:opacity-100 p-1 rounded-md transition-all duration-200 hover:bg-black/10 ${
                isUser ? 'text-blue-100 hover:text-white' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
              aria-label="Copy message"
            >
              {copied ? (
                <Check className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};