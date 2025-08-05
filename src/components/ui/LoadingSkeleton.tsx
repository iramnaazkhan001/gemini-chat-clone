interface LoadingSkeletonProps {
  className?: string;
  count?: number;
}

export const MessageSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="space-y-4 p-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-xs lg:max-w-md ${index % 2 === 0 ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-700'} rounded-2xl p-3 animate-pulse`}>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ChatroomListSkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <div className="space-y-2 p-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 animate-pulse">
          <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );
};

export const LoadingSkeleton = ({ className = "h-4 bg-gray-300 dark:bg-gray-600 rounded", count = 1 }: LoadingSkeletonProps) => {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={className}></div>
      ))}
    </div>
  );
};