import RatingStars from "./RatingStars";

function RatingCard({ rating, category, verdict }) {
  const getRatingColor = (rating) => {
    if (rating >= 4) return "text-green-400";
    if (rating >= 3) return "text-yellow-400";
    return "text-red-400";
  };

  const getRatingLabel = (rating) => {
    if (rating >= 4.5) return "Excellent";
    if (rating >= 4) return "Very Good";
    if (rating >= 3) return "Average";
    if (rating >= 2) return "Poor";
    return "Very Poor";
  };

  return (
    <div className="bg-gray-900 border border-gray-800 
      rounded-2xl p-6">
      <div className="flex items-center 
        justify-between flex-wrap gap-4">

        {/* Category */}
        <div>
          <p className="text-gray-500 text-xs 
            uppercase tracking-wider mb-1">
            Product Category
          </p>
          <p className="text-purple-400 font-semibold 
            text-xl">
            {category || "Unknown"}
          </p>
          <p className={`text-sm mt-2 font-medium
            ${getRatingColor(rating)}`}>
            {getRatingLabel(rating)}
          </p>
        </div>

        {/* Rating */}
        <div className="text-right">
          <p className="text-gray-500 text-xs 
            uppercase tracking-wider mb-2">
            Overall Rating
          </p>

          {/* Main Rating Display */}
          <div className="flex items-end gap-2 
            justify-end">
            <span className={`text-6xl font-bold 
              ${getRatingColor(rating)}`}>
              {rating}
            </span>
            <div className="mb-2">
              <span className="text-gray-500 text-xl">
                /5
              </span>
              <span className="text-gray-600 text-sm 
                ml-2">
                ({Math.round(rating)}/5)
              </span>
            </div>
          </div>

          {/* Stars */}
          <div className="flex justify-end mt-1">
            <RatingStars rating={rating} />
          </div>
        </div>
      </div>

      {/* Verdict */}
      {verdict && (
        <div className="mt-5 bg-purple-900/30 
          border border-purple-800/50 
          rounded-xl p-4">
          <p className="text-purple-300 text-sm 
            leading-relaxed">
            🏆 {verdict}
          </p>
        </div>
      )}
    </div>
  );
}

export default RatingCard;
