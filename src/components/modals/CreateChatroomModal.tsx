'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import useChatStore from '@/store/useChatStore';

const chatroomSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(50, 'Title must be less than 50 characters')
    .trim(),
});

type ChatroomFormData = z.infer<typeof chatroomSchema>;

interface CreateChatroomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateChatroomModal = ({ isOpen, onClose }: CreateChatroomModalProps) => {
  const { createChatroom } = useChatStore();

  const form = useForm<ChatroomFormData>({
    resolver: zodResolver(chatroomSchema),
    defaultValues: {
      title: '',
    },
  });

  const handleSubmit = (data: ChatroomFormData) => {
    createChatroom(data.title);
    form.reset();
    onClose();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Create New Chatroom
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="p-6 space-y-4">
          <Input
            label="Chatroom Title"
            {...form.register('title')}
            error={form.formState.errors.title?.message}
            placeholder="Enter chatroom title..."
            autoFocus
          />

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={form.formState.isSubmitting}
            >
              Create Chatroom
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};