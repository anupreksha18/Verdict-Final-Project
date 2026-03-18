function RatingStars({ rating }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      // Full star
      stars.push(
        <span key={i} className="text-yellow-400">
          ★
        </span>
      );
    } else if (
      i === Math.ceil(rating) &&
      rating % 1 !== 0
    ) {
      // Half star - same symbol different color
      stars.push(
        <span key={i} className="text-yellow-400 
          opacity-50">
          ★
        </span>
      );
    } else {
      // Empty star
      stars.push(
        <span key={i} className="text-gray-600">
          ★
        </span>
      );
    }
  }

  return (
    <div className="flex gap-0.5 text-2xl mt-1">
      {stars}
    </div>
  );
}

export default RatingStars;
