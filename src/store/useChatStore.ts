import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { ChatState, User, Chatroom, Message, Country } from '@/types';
import toast from 'react-hot-toast';

interface ChatActions {
  // Auth actions
  login: (phoneNumber: string, countryCode: string) => void;
  logout: () => void;
  setCountries: (countries: Country[]) => void;
  
  // Chatroom actions
  createChatroom: (title: string) => void;
  deleteChatroom: (id: string) => void;
  setCurrentChatroom: (id: string | null) => void;
  
  // Message actions
  addMessage: (chatroomId: string, content: string, image?: string) => void;
  simulateAIResponse: (chatroomId: string) => void;
  
  // UI actions
  setIsLoading: (loading: boolean) => void;
  setIsDarkMode: (isDark: boolean) => void;
  setIsTyping: (typing: boolean) => void;
  setSearchQuery: (query: string) => void;
  
  // Utility actions
  initializeApp: () => void;
}

const initialState: ChatState = {
  user: null,
  chatrooms: [],
  currentChatroom: null,
  countries: [],
  isLoading: false,
  isDarkMode: false,
  isTyping: false,
  searchQuery: '',
};

const useChatStore = create<ChatState & ChatActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      login: (phoneNumber: string, countryCode: string) => {
        const user: User = {
          id: uuidv4(),
          phoneNumber,
          countryCode,
          isAuthenticated: true,
        };
        set({ user });
        toast.success('Successfully logged in!');
      },

      logout: () => {
        set({ user: null, currentChatroom: null });
        toast.success('Logged out successfully');
      },

      setCountries: (countries: Country[]) => {
        set({ countries });
      },

      createChatroom: (title: string) => {
        const newChatroom: Chatroom = {
          id: uuidv4(),
          title,
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        set((state) => ({
          chatrooms: [newChatroom, ...state.chatrooms],
          currentChatroom: newChatroom.id,
        }));
        
        toast.success('Chatroom created successfully!');
      },

      deleteChatroom: (id: string) => {
        const chatroom = get().chatrooms.find(c => c.id === id);
        if (!chatroom) return;

        set((state) => ({
          chatrooms: state.chatrooms.filter((c) => c.id !== id),
          currentChatroom: state.currentChatroom === id ? null : state.currentChatroom,
        }));
        
        toast.success(`"${chatroom.title}" deleted`);
      },

      setCurrentChatroom: (id: string | null) => {
        set({ currentChatroom: id });
      },

      addMessage: (chatroomId: string, content: string, image?: string) => {
        const message: Message = {
          id: uuidv4(),
          content,
          sender: 'user',
          timestamp: new Date(),
          image,
        };

        set((state) => ({
          chatrooms: state.chatrooms.map((chatroom) =>
            chatroom.id === chatroomId
              ? {
                  ...chatroom,
                  messages: [...chatroom.messages, message],
                  lastMessage: message,
                  updatedAt: new Date(),
                }
              : chatroom
          ),
        }));

        // Simulate AI response after a delay
        setTimeout(() => {
          get().simulateAIResponse(chatroomId);
        }, 1500 + Math.random() * 2000);
      },

      simulateAIResponse: (chatroomId: string) => {
        const responses = [
          "I understand your question. Let me help you with that.",
          "That's an interesting point. Here's what I think about it.",
          "I can help you explore this topic further. What specific aspect interests you most?",
          "Based on what you've shared, here are some thoughts:",
          "That's a great question! Let me break this down for you.",
          "I see what you're getting at. Here's my perspective:",
          "Thanks for sharing that. Here's what I can offer:",
          "That's worth considering. From my understanding:",
        ];

        const aiMessage: Message = {
          id: uuidv4(),
          content: responses[Math.floor(Math.random() * responses.length)],
          sender: 'ai',
          timestamp: new Date(),
        };

        set((state) => ({
          chatrooms: state.chatrooms.map((chatroom) =>
            chatroom.id === chatroomId
              ? {
                  ...chatroom,
                  messages: [...chatroom.messages, aiMessage],
                  lastMessage: aiMessage,
                  updatedAt: new Date(),
                }
              : chatroom
          ),
          isTyping: false,
        }));
      },

      setIsLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setIsDarkMode: (isDark: boolean) => {
        set({ isDarkMode: isDark });
        if (typeof window !== 'undefined') {
          if (isDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      },

      setIsTyping: (typing: boolean) => {
        set({ isTyping: typing });
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      initializeApp: () => {
        if (typeof window === 'undefined') return;
        
        // Initialize dark mode based on system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const stored = localStorage.getItem('chat-store');
        
        if (!stored) {
          get().setIsDarkMode(prefersDark);
        } else {
          const parsedStore = JSON.parse(stored);
          if (parsedStore.state?.isDarkMode) {
            document.documentElement.classList.add('dark');
          }
        }
      },
    }),
    {
      name: 'chat-store',
      partialize: (state) => ({
        user: state.user,
        chatrooms: state.chatrooms,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);

export default useChatStore;