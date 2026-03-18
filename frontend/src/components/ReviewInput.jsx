import { useState } from "react";

function ReviewInput({ onAnalyze, loading }) {
  const [reviews, setReviews] = useState("");

  const reviewCount = reviews
    .split("\n")
    .filter(line => line.trim().length > 5)
    .length;

  const handleSubmit = () => {
    if (!reviews.trim()) {
      alert("Please paste some reviews first!");
      return;
    }
    if (reviewCount < 3) {
      alert("Please paste at least 3 reviews!");
      return;
    }
    onAnalyze(reviews);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 
      rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-1 
        text-purple-400">
        📋 Paste Customer Reviews
      </h2>
      <p className="text-gray-500 text-sm mb-4">
        Copy reviews from Amazon, Flipkart, or any 
        e-commerce website and paste below
      </p>

      <textarea
        className="w-full bg-gray-950 border 
          border-gray-700 rounded-xl p-4 text-sm 
          text-gray-200 placeholder-gray-600 
          focus:outline-none focus:border-purple-500 
          resize-none transition"
        rows={10}
        placeholder={`Paste reviews here, one per line...

Example:
Battery life is terrible, drains in 2 hours.
Camera quality is amazing, best in class.
Build quality feels cheap and plastic.
Sound quality is outstanding.
Not worth the price at all.`}
        value={reviews}
        onChange={(e) => setReviews(e.target.value)}
      />

      <div className="flex items-center 
        justify-between mt-4 flex-wrap gap-3">
        <div className="flex items-center gap-4">
          <p className="text-gray-600 text-xs">
            💡 10-50 reviews = best results
          </p>
          {reviews && (
            <p className="text-purple-400 text-xs 
              font-medium">
              {reviewCount} reviews detected
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setReviews("")}
            className="px-4 py-2 text-sm text-gray-400 
              border border-gray-700 rounded-xl 
              hover:bg-gray-800 transition"
          >
            Clear
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 text-sm font-semibold 
              bg-purple-600 hover:bg-purple-700 
              disabled:opacity-50 
              disabled:cursor-not-allowed
              rounded-xl transition"
          >
            {loading ? "Analyzing..." : "⚡ Analyze"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewInput;