import { useState } from "react";

import {
  analyzeReviews,
  scrapeAndAnalyze,
  datasetAnalyze
} from "../services/api";

import RatingCard from "../components/RatingCard";
import SummaryCard from "../components/SummaryCard";
import ProsCons from "../components/ProsCons";
import SentimentChart from "../components/SentimentChart";
import AspectGrid from "../components/AspectGrid";
import FakeDetector from "../components/FakeDetector";
import Loader from "../components/Loader";

const MODES = [
  { id: "paste", label: "Paste Reviews" },
  { id: "url", label: "Product URL" },
  { id: "dataset", label: "Search Product" },
];

function Analyzer() {
  const [mode, setMode] = useState("paste");
  const [reviews, setReviews] = useState("");
  const [url, setUrl] = useState("");
  const [productName, setProductName] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let response;

      if (mode === "paste") {
        if (!reviews.trim()) {
          setError("Paste reviews first");
          setLoading(false);
          return;
        }

        response = await analyzeReviews(reviews);
      }

      if (mode === "url") {
        if (!url.trim()) {
          setError("Enter product URL");
          setLoading(false);
          return;
        }

        response = await scrapeAndAnalyze(url);
      }

      if (mode === "dataset") {
        if (!productName.trim()) {
          setError("Enter product name");
          setLoading(false);
          return;
        }

        response = await datasetAnalyze(productName);
      }

      setResult(response.data);

    } catch (err) {
      setError(err.response?.data?.error || "Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setReviews("");
    setUrl("");
    setProductName("");
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-black overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="fixed inset-0 -z-10">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-200/30 blur-3xl rounded-full" />

        <div className="absolute top-[200px] right-0 w-[400px] h-[400px] bg-blue-200/30 blur-3xl rounded-full" />

      </div>

      {/* ================= HEADER ================= */}
      <div className="sticky top-0 z-30 backdrop-blur-xl bg-white/80 border-b border-gray-200">

        <div className="px-6 md:px-16 py-5 flex flex-col md:flex-row md:items-center justify-between gap-5">

          {/* TITLE */}
          <div>


            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Analyzer Dashboard
            </h1>

            <p className="text-gray-500 mt-2 text-sm max-w-lg">
              Transform noisy product reviews into clean, structured insights instantly.
            </p>

          </div>

          {/* MODE SWITCH */}
          <div className="flex bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl p-1 shadow-sm">

            {MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setMode(m.id);
                  handleReset();
                }}
                className={`px-5 py-2.5 text-sm rounded-xl transition-all duration-200 ${
                  mode === m.id
                    ? "bg-black text-white shadow-sm"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {m.label}
              </button>
            ))}

          </div>

        </div>

      </div>

      {/* ================= MAIN LAYOUT ================= */}
      <div className="px-6 md:px-16 py-10 grid lg:grid-cols-[380px_1fr] gap-8">

        {/* ================= LEFT PANEL ================= */}
        <div className="space-y-5 lg:sticky lg:top-28 h-fit">

          {/* INPUT CARD */}
          <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-3xl p-5 shadow-sm">

            <div className="mb-4">

              <h2 className="font-semibold text-lg">
                Input Source
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Add reviews, URLs, or search products
              </p>

            </div>

            {mode === "paste" && (
              <textarea
                rows={12}
                value={reviews}
                onChange={(e) => setReviews(e.target.value)}
                placeholder="Paste customer reviews here..."
                className="w-full bg-transparent text-sm outline-none resize-none text-gray-700 placeholder:text-gray-400 border border-gray-200 rounded-xl p-4"
              />
            )}

            {mode === "url" && (
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter product URL"
                className="w-full bg-transparent text-sm outline-none text-gray-700 placeholder:text-gray-400 border border-gray-200 rounded-xl p-4"
              />
            )}

            {mode === "dataset" && (
              <input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Search product"
                className="w-full bg-transparent text-sm outline-none text-gray-700 placeholder:text-gray-400 border border-gray-200 rounded-xl p-4"
              />
            )}

          </div>

          {/* ACTION BUTTON */}
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-black text-white font-medium hover:scale-[1.01] hover:bg-gray-900 transition-all"
          >
            {loading ? "Analyzing..." : "Run Analysis"}
          </button>

          {/* RESET */}
          <button
            onClick={handleReset}
            className="w-full py-4 rounded-2xl bg-white border border-gray-200 text-gray-600 hover:text-black hover:border-gray-300 transition"
          >
            Reset
          </button>

          {/* ERROR */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-red-500">
              {error}
            </div>
          )}

          {/* LOADER */}
          {loading && (
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <Loader />
            </div>
          )}

        </div>

        {/* ================= RIGHT PANEL ================= */}
        <div className="space-y-8">

          {/* ================= EMPTY STATE ================= */}
          {!result ? (

            <div className="space-y-8">

              {/* HERO PREVIEW */}
              <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-[32px] p-8 shadow-sm">

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">

                  <div>

                    <p className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-3">
                      AI Analysis Preview
                    </p>

                    <h2 className="text-3xl font-bold leading-tight">
                      Ready to generate
                      <br />
                      product intelligence
                    </h2>

                    <p className="text-gray-500 mt-4 max-w-lg">
                      Verdict analyzes customer opinions, detects sentiment,
                      extracts pros & cons, and generates decision-ready summaries.
                    </p>

                  </div>

                  {/* SCORE PREVIEW */}
                  <div className="w-full lg:w-[280px] bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 text-white">

                    <p className="text-gray-400 text-sm mb-3">
                      Example Rating
                    </p>

                    <div className="flex items-end gap-2">

                      <span className="text-6xl font-bold">
                        4.3
                      </span>

                      <span className="text-gray-400 text-xl mb-2">
                        /5
                      </span>

                    </div>

                    <div className="mt-5 h-2 bg-white/10 rounded-full overflow-hidden">

                      <div className="w-[86%] h-full bg-white rounded-full" />

                    </div>

                  </div>

                </div>

              </div>

              {/* PREVIEW GRID */}
              <div className="grid md:grid-cols-2 gap-6">

                {/* SUMMARY PREVIEW */}
                <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 shadow-sm">

                  <div className="flex items-center justify-between mb-5">

                    <h3 className="font-semibold text-lg">
                      AI Summary
                    </h3>

                    <div className="w-10 h-10 rounded-xl bg-gray-100" />

                  </div>

                  <div className="space-y-3">

                    <div className="h-3 bg-gray-100 rounded-full w-full" />
                    <div className="h-3 bg-gray-100 rounded-full w-[90%]" />
                    <div className="h-3 bg-gray-100 rounded-full w-[75%]" />
                    <div className="h-3 bg-gray-100 rounded-full w-[60%]" />

                  </div>

                </div>

                {/* SENTIMENT PREVIEW */}
                <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 shadow-sm">

                  <h3 className="font-semibold text-lg mb-6">
                    Sentiment Breakdown
                  </h3>

                  <div className="space-y-5">

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Positive</span>
                        <span>72%</span>
                      </div>

                      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div className="w-[72%] h-full bg-green-500 rounded-full" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Negative</span>
                        <span>18%</span>
                      </div>

                      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div className="w-[18%] h-full bg-red-500 rounded-full" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Neutral</span>
                        <span>10%</span>
                      </div>

                      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div className="w-[10%] h-full bg-yellow-500 rounded-full" />
                      </div>
                    </div>

                  </div>

                </div>

              </div>

              {/* LARGE PREVIEW SECTION */}
              <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-[32px] p-8 shadow-sm">

                <div className="flex items-center justify-between mb-8">

                  <div>

                    <h3 className="text-2xl font-semibold">
                      Aspect Intelligence
                    </h3>

                    <p className="text-gray-500 mt-1">
                      AI-generated product attribute scoring
                    </p>

                  </div>

                  <div className="px-4 py-2 rounded-xl bg-gray-100 text-sm text-gray-500">
                    Live Preview
                  </div>

                </div>

                <div className="grid md:grid-cols-3 gap-5">

                  {[
                    "Battery",
                    "Camera",
                    "Display",
                    "Performance",
                    "Build",
                    "Audio",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl bg-gray-50 border border-gray-100"
                    >

                      <div className="flex justify-between items-center mb-4">

                        <p className="text-sm text-gray-500">
                          {item}
                        </p>

                        <span className="text-sm font-medium">
                          4.{i}
                        </span>

                      </div>

                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">

                        <div
                          className="h-full bg-black rounded-full"
                          style={{
                            width: `${75 - i * 8}%`
                          }}
                        />

                      </div>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          ) : (

            <>
              {/* RESULTS */}
              <RatingCard
                rating={result.rating}
                category={result.product_category}
                verdict={result.verdict}
              />

              <div className="grid md:grid-cols-2 gap-6">
                <SummaryCard summary={result.summary} />
                <SentimentChart sentiment={result.sentiment} />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <ProsCons pros={result.pros} cons={result.cons} />
                <FakeDetector fakeReviews={result.fake_reviews} />
              </div>

              <AspectGrid aspects={result.aspects} />
            </>
          )}

        </div>

      </div>
    </div>
  );
}

export default Analyzer;