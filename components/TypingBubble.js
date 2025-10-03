function TypingBubble() {
  return (
    <div className="flex items-center gap-1 px-3 py-2 rounded-2xl max-w-xs">
      <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-75"></span>
      <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-150"></span>
      <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-300"></span>
    </div>
  );
}

export default TypingBubble;
