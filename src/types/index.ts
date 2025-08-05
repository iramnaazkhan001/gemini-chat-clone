export interface User {
  id: string;
  phoneNumber: string;
  countryCode: string;
  isAuthenticated: boolean;
}

export interface Country {
  name: {
    common: string;
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  flag: string;
  cca2: string;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  image?: string;
}

export interface Chatroom {
  id: string;
  title: string;
  messages: Message[];
  lastMessage?: Message;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatState {
  user: User | null;
  chatrooms: Chatroom[];
  currentChatroom: string | null;
  countries: Country[];
  isLoading: boolean;
  isDarkMode: boolean;
  isTyping: boolean;
  searchQuery: string;
}