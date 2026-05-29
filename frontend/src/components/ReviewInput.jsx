import { useState } from "react";

function ReviewInput({ onAnalyze, loading }) {
  const [reviews, setReviews] = useState("");

  const handleSubmit = () => {
    if (!reviews.trim()) return;
    onAnalyze(reviews);
  };

  return (
    <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6">
      <h2 className="text-purple-300 font-semibold mb-2">
        Paste Reviews
      </h2>

      <textarea
        rows={10}
        value={reviews}
        onChange={(e) => setReviews(e.target.value)}
        className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4 text-gray-200 text-sm"
        placeholder="Paste reviews here..."
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-xl"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
}

export default ReviewInput;