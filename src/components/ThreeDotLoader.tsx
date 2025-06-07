const ThreeDotLoader = () => {
  return (
    <div className="flex items-center justify-center space-x-2 h-16">
      <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
    </div>
  );
};

export default ThreeDotLoader;
