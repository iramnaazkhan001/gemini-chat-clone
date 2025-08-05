import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gemini Chat Clone - AI Conversational Interface',
  description: 'A fully functional, responsive chat application that mimics Google\'s Gemini AI interface. Built with Next.js, TypeScript, Zustand, and Tailwind CSS.',
  keywords: ['Gemini', 'AI Chat', 'Next.js', 'TypeScript', 'Zustand', 'Tailwind CSS'],
  authors: [{ name: 'Kuvaka Tech Frontend Developer' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' }
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}