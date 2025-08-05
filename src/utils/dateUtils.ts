// src/utils/dateUtils.ts

// Formats a date to a time string (e.g., "6:09 PM")
export const formatTime = (date: Date | null | undefined): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return 'Invalid time';
  }
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

// Formats the distance between now and the given date (e.g., "just now", "5m ago")
export const formatDistanceToNow = (date: Date | null | undefined): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return 'Invalid date';
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks}w ago`;
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
};