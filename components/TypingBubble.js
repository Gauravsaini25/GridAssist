function TypingBubble() {
  return (
    <div className="flex items-center gap-1 px-3 py-2 rounded-2xl max-w-xs bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 shadow">
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></span>
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></span>
    </div>
  );
}
