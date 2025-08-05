'use client';

import { useState, useRef } from 'react';
import { Send, Image, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

interface MessageInputProps {
  onSendMessage: (content: string, image?: string) => void;
  disabled?: boolean;
}

export const MessageInput = ({ onSendMessage, disabled }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if ((!message.trim() && !image) || disabled) return;

    onSendMessage(message.trim(), image || undefined);
    setMessage('');
    setImage(null);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 p-4">
      {image && (
        <div className="mb-3 relative inline-block">
          <img
            src={image}
            alt="Preview"
            className="max-w-32 max-h-32 rounded-lg border border-gray-300 dark:border-gray-600"
          />
          <button
            onClick={() => setImage(null)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        <div className="flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Message Gemini..."
            disabled={disabled}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[44px] max-h-32"
            rows={1}
            style={{
              height: 'auto',
              minHeight: '44px',
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = Math.min(target.scrollHeight, 128) + 'px';
            }}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            aria-label="Upload image"
          >
            <Image className="h-5 w-5" />
          </Button>

          <Button
            type="submit"
            disabled={(!message.trim() && !image) || disabled}
            className="px-4 py-2"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};