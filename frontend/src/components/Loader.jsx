function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>

      <p className="text-gray-600 mt-4 text-sm">
        Analyzing reviews...
      </p>

      <p className="text-gray-400 text-xs mt-1">
        This may take a few seconds
      </p>
    </div>
  );
}

export default Loader;