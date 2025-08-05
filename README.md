# Gemini Chat Clone - Next.js Implementation

A fully functional, responsive chat application that mimics Google's Gemini AI interface. Built with Next.js 15, TypeScript, Zustand, and Tailwind CSS.

## Live Link

[View Live Application](https://your-deployment-url.vercel.app)

## Features

### Authentication
- OTP-based login/signup with country code selection
- Real-time country data fetched from REST Countries API
- Form validation using React Hook Form + Zod
- Simulated OTP generation and validation

### Chat Interface
- Create and delete chatrooms with confirmation dialogs
- Real-time message simulation with typing indicators
- AI response simulation with realistic delays and throttling
- Image upload support with base64 preview
- Copy-to-clipboard functionality on message hover
- Auto-scroll to latest messages
- Infinite scroll pagination (simulated)
- Message timestamps and sender identification

### UI/UX Features
- Fully responsive design (mobile, tablet, desktop)
- Dark/light mode toggle with system preference detection
- Debounced search for filtering chatrooms
- Toast notifications for all key actions
- Loading skeletons for improved perceived performance
- Keyboard accessibility throughout the application
- Modern Material Design-inspired interface

### Technical Features
- State management with Zustand
- Local storage persistence for auth and chat data
- TypeScript for type safety
- Modern React patterns with hooks
- Component-based architecture
- Performance optimizations
- Next.js 15 App Router for optimal performance

## Tech Stack

- Framework: Next.js 15 with App Router
- Runtime: React 18 with TypeScript
- State Management: Zustand with persistence
- Form Validation: React Hook Form + Zod
- Styling: Tailwind CSS
- Icons: Lucide React
- Notifications: React Hot Toast
- Deployment: Vercel

## Installation & Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/gemini-chat-clone.git
cd gemini-chat-clone
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

5. Start production server
```bash
npm start
```

## Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── auth/
│   │   └── LoginForm.tsx
│   ├── chat/
│   │   ├── ChatWindow.tsx
│   │   ├── ChatroomList.tsx
│   │   ├── MessageItem.tsx
│   │   ├── MessageInput.tsx
│   │   └── TypingIndicator.tsx
│   ├── layout/
│   │   └── Header.tsx
│   ├── modals/
│   │   └── CreateChatroomModal.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       └── LoadingSkeleton.tsx
├── store/
│   └── useChatStore.ts
├── types/
│   └── index.ts
└── utils/
    ├── cn.ts
    └── dateUtils.ts
```

## Key Implementation Details

### Next.js 15 Features
- App Router: Modern routing with layouts and nested routes
- Server Components: Optimized performance with selective client components
- TypeScript: Full type safety throughout the application
- Image Optimization: Built-in Next.js image optimization
- Performance: Automatic code splitting and optimization

### State Management
- Zustand Store: Centralized state management with persistence
- Local Storage: Auth data and chat history persistence
- Optimistic Updates: Immediate UI updates for better UX

### Form Validation
- React Hook Form: Efficient form handling with minimal re-renders
- Zod Schema: Type-safe validation for phone numbers and OTP
- Real-time Validation: Immediate feedback on form errors

### Chat Features
- Message Throttling: Simulated AI thinking time with setTimeout
- Infinite Scroll: Pagination simulation for older messages
- Auto-scroll: Smart scrolling to latest messages
- Image Handling: Base64 encoding for image previews

### Responsive Design
- Mobile-first: Optimized for all screen sizes
- Sidebar Navigation: Collapsible sidebar with overlay on mobile
- Touch-friendly: Appropriate touch targets and gestures

### Accessibility
- Keyboard Navigation: Full keyboard support
- Screen Reader: Proper ARIA labels and semantic HTML
- Focus Management: Logical focus flow throughout the app
- Color Contrast: WCAG compliant color ratios

## 🎨 Design System

### Colors
- Primary: Blue (#3B82F6)
- Secondary: Gray scale for neutral elements
- Success: Green for positive actions
- Error: Red for warnings and errors
- Dark Mode: Full dark theme support

### Typography
- Font: Inter for clean, modern readability
- Hierarchy: Clear heading and body text distinctions
- Line Height: Optimized for readability (150% body, 120% headings)

### Spacing
- 8px Grid System: Consistent spacing throughout
- Component Padding: 12px-24px for comfortable touch targets
- Container Max-width: Responsive containers with proper margins

## Deployment

The application is optimized for deployment on Vercel with automatic deployments from the main branch.

### Environment Variables
No environment variables required - all functionality is client-side simulated.

### Build Process
```bash
npm run build
```

Generates optimized production build in the `.next/` directory.

## Testing

The application includes comprehensive form validation and error handling:

- Phone Number Validation: Country code + 10+ digit validation
- OTP Validation: 6-digit numeric validation
- Image Upload: File type and size validation
- Form States: Loading, error, and success states

## Future Enhancements

- Real AI integration with Google's Gemini API
- Voice message support
- File sharing capabilities
- Message reactions and replies
- User profiles and settings
- Message search functionality
- Push notifications
- Real-time collaboration features


Note: This is a frontend-only implementation with simulated backend functionality. All data is stored locally and OTP validation is simulated for demonstration purposes.