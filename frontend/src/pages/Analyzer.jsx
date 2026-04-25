import { useState } from "react";
import { analyzeReviews, scrapeAndAnalyze, datasetAnalyze } from "../services/api";
import RatingCard from "../components/RatingCard";
import SummaryCard from "../components/SummaryCard";
import ProsCons from "../components/ProsCons";
import SentimentChart from "../components/SentimentChart";
import AspectGrid from "../components/AspectGrid";
import FakeDetector from "../components/FakeDetector";
import Loader from "../components/Loader";

const MODES = [
  {
    id: "paste",
    icon: "📋",
    label: "Paste Reviews",
    desc: "Copy reviews from any website and paste here",
  },
  {
    id: "url",
    icon: "🔗",
    label: "Flipkart URL",
    desc: "Paste a Flipkart product URL — reviews fetched automatically",
  },
  {
    id: "dataset",
    icon: "🔍",
    label: "Search Product",
    desc: "Type a product name to search our review dataset",
  },
];

function Analyzer() {
  const [mode, setMode]       = useState("paste");
  const [reviews, setReviews] = useState("");
  const [url, setUrl]         = useState("");
  const [productName, setProductName] = useState("");
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [meta, setMeta]       = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setMeta(null);

    try {
      let response;

      if (mode === "paste") {
        if (!reviews.trim()) {
          setError("Please paste some reviews first!");
          return;
        }
        response = await analyzeReviews(reviews);
        setResult(response.data);

      } else if (mode === "url") {
        if (!url.trim()) {
          setError("Please enter a Flipkart URL!");
          return;
        }
        if (!url.toLowerCase().includes("flipkart")) {
          setError("Please enter a valid Flipkart URL!");
          return;
        }
        response = await scrapeAndAnalyze(url);
        console.log("FULL RESPONSE:", response);
        console.log("DATA:", response.data);
        setResult(response.data);
        setMeta({ reviews_count: response.reviews_scraped });

      } else if (mode === "dataset") {
        if (!productName.trim()) {
          setError("Please enter a product name!");
          return;
        }
        response = await datasetAnalyze(productName);
        setResult(response.data);
        setMeta({
          product_info: response.product_info,
          reviews_count: response.reviews_analyzed
        });
      }

    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Something went wrong! Check if backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setMeta(null);
    setReviews("");
    setUrl("");
    setProductName("");
  };

  return (
    <div className="w-full px-6 py-12">

      {/* ── Page Header ─────────────────────────── */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">
          ⚖️ Get Your Verdict
        </h1>
        <p className="text-gray-500">
          Choose how you want to analyze product reviews
        </p>
      </div>

      {/* ── Mode Selector ───────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => { setMode(m.id); handleReset(); }}
            className={`p-5 rounded-2xl border text-left transition-all ${
              mode === m.id
                ? "border-purple-500 bg-purple-900/20 text-white"
                : "border-gray-800 bg-gray-900 text-gray-400 hover:border-gray-600"
            }`}
          >
            <div className="text-2xl mb-2">{m.icon}</div>
            <div className={`font-semibold text-sm mb-1 ${
              mode === m.id ? "text-purple-400" : "text-gray-300"
            }`}>
              {m.label}
            </div>
            <div className="text-xs text-gray-500 leading-relaxed">
              {m.desc}
            </div>
          </button>
        ))}
      </div>

      {/* ── Input Area ──────────────────────────── */}
      <div className="max-w-4xl mx-auto">

        {/* Mode 1 — Paste Reviews */}
        {mode === "paste" && (
          <div>
            <textarea
              value={reviews}
              onChange={(e) => setReviews(e.target.value)}
              placeholder="Paste customer reviews here...

Example:
Great product! Battery lasts all day.
Not satisfied with the build quality.
Amazing sound, worth every penny!"
              rows={10}
              className="w-full bg-gray-900 border border-gray-700 rounded-2xl p-5 text-gray-300 text-sm placeholder-gray-600 focus:outline-none focus:border-purple-600 resize-none"
            />
            <p className="text-xs text-gray-600 mt-2">
              Tip: Paste reviews from Amazon, Flipkart, Meesho or any website
            </p>
          </div>
        )}

        {/* Mode 2 — Flipkart URL */}
        {mode === "url" && (
          <div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.flipkart.com/product-name/p/..."
              className="w-full bg-gray-900 border border-gray-700 rounded-2xl p-5 text-gray-300 text-sm placeholder-gray-600 focus:outline-none focus:border-purple-600"
            />
            <p className="text-xs text-gray-600 mt-2">
              ⚠️ Only Flipkart URLs supported. Reviews will be fetched automatically (takes ~30 seconds)
            </p>
          </div>
        )}

        {/* Mode 3 — Dataset Search */}
        {mode === "dataset" && (
          <div>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. Fire HD tablet, Kindle, Echo Dot..."
              className="w-full bg-gray-900 border border-gray-700 rounded-2xl p-5 text-gray-300 text-sm placeholder-gray-600 focus:outline-none focus:border-purple-600"
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
            />
            <p className="text-xs text-gray-600 mt-2">
              💡 Dataset contains Amazon Electronics reviews — try: Fire tablet, Kindle, Echo, Bose headphones
            </p>
          </div>
        )}

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full mt-5 py-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-2xl transition text-base"
        >
          {loading
            ? mode === "url"
              ? "⏳ Scraping reviews... (this takes ~30s)"
              : "⏳ Analyzing..."
            : "⚖️ Analyze Now"
          }
        </button>

      </div>

      {/* ── Error ───────────────────────────────── */}
      {error && (
        <div className="mt-6 max-w-4xl mx-auto bg-red-900/30 border border-red-700 text-red-300 px-6 py-4 rounded-xl text-sm">
          ❌ {error}
        </div>
      )}

      {/* ── Loader ──────────────────────────────── */}
      {loading && <Loader />}

      {/* ── Meta Info ───────────────────────────── */}
      {meta && !loading && (
        <div className="mt-6 max-w-4xl mx-auto bg-purple-900/20 border border-purple-800/40 rounded-xl px-6 py-3 flex flex-wrap gap-4 text-sm">
          {meta.reviews_count && (
            <span className="text-purple-300">
              📊 {meta.reviews_count} reviews analyzed
            </span>
          )}
          {meta.product_info?.name && (
            <span className="text-gray-400">
              📦 {meta.product_info.name}
            </span>
          )}
          {meta.product_info?.brand && (
            <span className="text-gray-500">
              🏷️ {meta.product_info.brand}
            </span>
          )}
        </div>
      )}

      {/* ── Results ─────────────────────────────── */}
      {result && !loading && (
        <div className="mt-10 space-y-6">
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

          {/* Analyze Again */}
          <div className="text-center pt-4">
            <button
              onClick={handleReset}
              className="px-8 py-3 border border-gray-700 hover:border-purple-600 text-gray-400 hover:text-white rounded-xl transition text-sm"
            >
              🔄 Analyze Another Product
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Analyzer;