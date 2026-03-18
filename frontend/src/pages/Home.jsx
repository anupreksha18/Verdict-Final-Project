import { useState } from "react";
import { analyzeReviews } from "../services/api.js";
import ReviewInput from "../components/ReviewInput.jsx";
import RatingCard from "../components/RatingCard";
import SummaryCard from "../components/SummaryCard";
import ProsCons from "../components/ProsCons";
import SentimentChart from "../components/SentimentChart";
import AspectGrid from "../components/AspectGrid";
import FakeDetector from "../components/FakeDetector";
import Loader from "../components/Loader.jsx";

function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (reviews) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await analyzeReviews(reviews);
      setResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Something went wrong! Check if backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* Review Input */}
      <ReviewInput
        onAnalyze={handleAnalyze}
        loading={loading}
      />

      {/* Error */}
      {error && (
        <div className="mt-6 bg-red-900/30 border 
          border-red-700 text-red-300 px-4 py-3 
          rounded-xl text-sm">
          ❌ {error}
        </div>
      )}

      {/* Loader */}
      {loading && <Loader />}

      {/* Results */}
      {result && !loading && (
        <div className="mt-8 space-y-6">
          <RatingCard
            rating={result.rating}
            category={result.product_category}
            verdict={result.verdict}
          />
          <SummaryCard summary={result.summary} />
          <ProsCons
            pros={result.pros}
            cons={result.cons}
          />
          <SentimentChart sentiment={result.sentiment} />
          <AspectGrid aspects={result.aspects} />
          <FakeDetector fakeReviews={result.fake_reviews} />
        </div>
      )}

    </div>
  );
}

export default Home;