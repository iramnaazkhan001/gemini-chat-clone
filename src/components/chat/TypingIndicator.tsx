export const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-xs lg:max-w-md">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-xs">🤖</span>
            </div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Gemini
            </span>
          </div>
          <div className="flex items-center space-x-1 mt-2">
            <span className="text-gray-600 dark:text-gray-300">Gemini is typing</span>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};