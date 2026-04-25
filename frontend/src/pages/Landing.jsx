import { Link } from "react-router-dom";
import heroImg from "../assets/hero.png";

function Landing() {
  const features = [
    { icon: "⭐", title: "Smart Rating", desc: "AI generates accurate 1-5 star rating from all reviews combined" },
    { icon: "📋", title: "Summary", desc: "Get a concise 3-4 line summary of hundreds of reviews instantly" },
    { icon: "✅", title: "Pros & Cons", desc: "Automatically extracts top positives and negatives from reviews" },
    { icon: "😊", title: "Sentiment Analysis", desc: "Visual breakdown of positive, negative and neutral sentiment" },
    { icon: "🔍", title: "Aspect Analysis", desc: "Auto-detects aspects like battery, camera, comfort per product" },
    { icon: "⚠️", title: "Fake Detection", desc: "Identifies suspicious and fake reviews automatically" },
  ];

  return (
    <div className="w-full">

      {/* ── HERO ─────────────────────────────────────────── */}
      <div
        className="w-full min-h-screen px-6 relative overflow-hidden flex items-center"
        style={{ background: "#050510" }}
      >
        {/* Grid pattern background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(124,58,237,0.07) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(124,58,237,0.07) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Big purple glow center */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px", height: "500px",
            background: "radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Top left glow */}
        <div
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            width: "500px", height: "500px",
            background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Bottom right glow */}
        <div
          className="absolute bottom-0 right-0 pointer-events-none"
          style={{
            width: "400px", height: "400px",
            background: "radial-gradient(circle, rgba(167,139,250,0.10) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center relative z-10">

          {/* Left — text */}
          <div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-700/50 bg-purple-900/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-purple-300 text-sm font-medium">
                AI Powered · RAG · Completely Free
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Give Every Product
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #A78BFA, #7C3AED, #C4B5FD)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Its Verdict ⚖️
              </span>
            </h1>

            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Stop reading hundreds of reviews manually.
              Paste them in Verdict and get instant AI-powered
              ratings, summary, pros, cons and sentiment
              analysis — for any product.
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-4 flex-wrap mb-10">
              <Link
                to="/analyzer"
                className="px-8 py-4 text-white font-semibold rounded-xl transition text-base"
                style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
              >
                ⚡ Try Verdict Free
              </Link>
              <Link
                to="/how-it-works"
                className="px-8 py-4 border border-gray-700 hover:border-purple-600 text-gray-300 hover:text-white font-semibold rounded-xl transition text-base"
              >
                How It Works →
              </Link>
            </div>

            {/* Stats pills */}
            <div className="flex items-center gap-4 flex-wrap">
              {[
                { label: "Analysis Time", value: "< 5s" },
                { label: "Cost", value: "₹0" },
                { label: "Categories", value: "Any Product" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg"
                  style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}
                >
                  <span className="text-purple-400 font-bold text-sm">{s.value}</span>
                  <span className="text-gray-500 text-xs">{s.label}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right — hero image with glow */}
          <div className="relative flex items-center justify-center">
            {/* Glow behind image */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse, rgba(124,58,237,0.25) 0%, transparent 70%)",
                filter: "blur(20px)",
                transform: "scale(1.1)",
              }}
            />
            <img
              src={heroImg}
              alt="Verdict in action"
              className="w-full relative z-10"
              style={{
                borderRadius: "16px",
                border: "1px solid rgba(124,58,237,0.4)",
                boxShadow: "0 0 40px rgba(124,58,237,0.2), 0 0 80px rgba(124,58,237,0.1)",
              }}
            />
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <span className="text-gray-600 text-xs tracking-widest">SCROLL</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2L7 12M7 12L3 8M7 12L11 8" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

      </div>

      {/* ── FEATURES ─────────────────────────────────────── */}
      <div className="w-full px-6 py-20" style={{ background: "#080818" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-3">Everything You Need</h2>
            <p className="text-gray-500 text-base">
              Comprehensive review analysis powered by RAG + Llama 3.3 70B
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-8 transition group flex gap-5 items-start cursor-default"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onMouseEnter={e => e.currentTarget.style.border = "1px solid rgba(124,58,237,0.5)"}
                onMouseLeave={e => e.currentTarget.style.border = "1px solid rgba(255,255,255,0.06)"}
              >
                <span className="text-4xl shrink-0">{f.icon}</span>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-purple-400 transition">
                    {f.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────── */}
      <div
        className="w-full px-6 py-24 text-center relative overflow-hidden"
        style={{ background: "#050510" }}
      >
        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Your Verdict?
          </h2>
          <p className="text-gray-500 text-base mb-10">
            No signup required. Completely free. Works for any product.
          </p>
          <Link
            to="/analyzer"
            className="px-12 py-4 text-white font-semibold rounded-xl transition text-base inline-block"
            style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
          >
            ⚖️ Get Verdict Now
          </Link>
        </div>
      </div>

    </div>
  );
}

export default Landing;