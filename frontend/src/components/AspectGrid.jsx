import AspectCard from "./AspectCard";

function AspectGrid({ aspects }) {
  if (!aspects || Object.keys(aspects).length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-900 border border-gray-800 
      rounded-2xl p-6">
      <h3 className="text-purple-400 font-semibold 
        mb-4">
        🔍 Aspect Analysis
      </h3>
      <div className="grid grid-cols-2 
        md:grid-cols-3 gap-4">
        {Object.entries(aspects).map(([key, value]) => (
          <AspectCard
            key={key}
            name={key}
            value={value}
          />
        ))}
      </div>
    </div>
  );
}

export default AspectGrid;