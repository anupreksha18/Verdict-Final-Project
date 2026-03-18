function Loader() {
  return (
    <div className="flex flex-col items-center 
      justify-center py-16">
      <div className="w-12 h-12 border-4 
        border-purple-500 border-t-transparent 
        rounded-full animate-spin">
      </div>
      <p className="text-gray-400 mt-4 text-sm">
        Analyzing reviews with AI...
      </p>
      <p className="text-gray-600 mt-1 text-xs">
        This may take a few seconds
      </p>
    </div>
  );
}

export default Loader;