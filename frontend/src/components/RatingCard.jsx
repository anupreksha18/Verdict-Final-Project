function RatingCard({ rating, category, verdict }) {
  const getColor = (rating) => {
    if (rating >= 4) return "text-green-600";
    if (rating >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

      <div className="flex justify-between flex-wrap gap-4">

        <div>
          <p className="text-gray-400 text-xs uppercase">Category</p>
          <p className="text-black font-semibold text-xl">
            {category}
          </p>
        </div>

        <div className="text-right">
          <p className="text-gray-400 text-xs uppercase">Rating</p>

          <div className={`text-5xl font-bold ${getColor(rating)}`}>
            {rating}
          </div>

          <p className="text-gray-500 text-sm">/5</p>
        </div>

      </div>

      {verdict && (
        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-4">
          <p className="text-gray-700 text-sm">{verdict}</p>
        </div>
      )}

    </div>
  );
}

export default RatingCard;