function RatingStars({ rating }) {
  return (
    <div className="flex text-yellow-400 text-xl gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>
          {i < Math.round(rating) ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

export default RatingStars;