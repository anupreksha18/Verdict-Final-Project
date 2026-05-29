function AspectCard({ name, value }) {
  const getScore = (val) => {
    if (!val || val === "NA") return null;
    const match = val.match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[1]) : null;
  };

  const score = getScore(value);
  const percentage = score ? (score / 5) * 100 : 0;

  const getColor = (score) => {
    if (score >= 4) return "bg-green-500";
    if (score >= 3) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
        {name}
      </p>

      <p className={`font-bold text-lg mb-2 ${
        score ? "text-black" : "text-gray-400"
      }`}>
        {value || "NA"}
      </p>

      {score && (
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full ${getColor(score)}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default AspectCard;