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

  const steps = [
    {
      num: "01",
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="4" y="3" width="20" height="22" rx="4" fill="none" stroke="#7C3AED" strokeWidth="1.5"/>
          <rect x="8" y="9" width="12" height="2" rx="1" fill="#A78BFA" fillOpacity="0.7"/>
          <rect x="8" y="13" width="9" height="2" rx="1" fill="#64748B" fillOpacity="0.6"/>
          <rect x="8" y="17" width="11" height="2" rx="1" fill="#64748B" fillOpacity="0.5"/>
        </svg>
      ),
      title: "Copy Reviews",
      desc: "Go to Amazon or Flipkart and copy the customer reviews section",
    },
    {
      num: "02",
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="9" stroke="#7C3AED" strokeWidth="1.5" fill="none"/>
          <circle cx="14" cy="14" r="4" fill="#7C3AED" fillOpacity="0.35"/>
          <circle cx="14" cy="14" r="2" fill="#A78BFA"/>
        </svg>
      ),
      title: "Paste & Analyze",
      desc: "Paste reviews into Verdict and hit the Analyze button",
    },
    {
      num: "03",
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="4" y="18" width="5" height="7" rx="1.5" fill="#7C3AED" fillOpacity="0.5"/>
          <rect x="12" y="13" width="5" height="12" rx="1.5" fill="#7C3AED" fillOpacity="0.7"/>
          <rect x="20" y="7" width="5" height="18" rx="1.5" fill="#A78BFA"/>
          <polyline points="6.5,14 14.5,9 22.5,3" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        </svg>
      ),
      title: "Get Insights",
      desc: "Instantly receive rating, summary, pros, cons and full analysis",
    },
  ];

  return (
    <div className="w-full">

      {/* ── HERO ─────────────────────────────────────────── */}
      <div className="w-full bg-gray-950 pt-20 pb-24 px-6 relative overflow-hidden">

        {/* bg glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-800/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left — text */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Give Every Product
              <br />
              <span className="text-purple-400">Its Verdict ⚖️</span>
            </h1>

            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Stop reading hundreds of reviews manually.
              Paste them in Verdict and get instant AI-powered
              ratings, summary, pros, cons and sentiment
              analysis — for any product.
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <Link
                to="/analyzer"
                className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition text-base"
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
          </div>

          {/* Right — real screenshot mockup */}
          <div className="relative flex items-center justify-center">
            <img
              src={heroImg}
              alt="Verdict in action"
              className="w-full rounded-2xl border border-purple-800/30"
            />
          </div>

        </div>
      </div>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <div className="w-full px-6 py-20 bg-gray-950 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-3">How It Works</h2>
            <p className="text-gray-500 text-base">3 simple steps to get complete analysis</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="flex justify-center mb-5">
                  <div className="w-16 h-16 bg-purple-900/20 rounded-2xl flex items-center justify-center border border-purple-900/40">
                    {step.icon}
                  </div>
                </div>
                <div className="text-purple-400 font-bold text-xs mb-2 tracking-widest">
                  STEP {step.num}
                </div>
                <h3 className="text-white font-semibold text-xl mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURES ─────────────────────────────────────── */}
      <div className="w-full px-6 py-20 bg-gray-900 border-y border-gray-800">
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
                className="bg-gray-950 border border-gray-800 rounded-2xl p-8 hover:border-purple-700 transition group flex gap-5 items-start"
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

      {/* ── DEMO PREVIEW ─────────────────────────────────── */}
      <div className="w-full px-6 py-20 bg-gray-950">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — mock result card */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Product Category</p>
                <p className="text-purple-400 font-bold text-lg">Wireless Earbuds</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Rating</p>
                <p className="text-5xl font-bold text-yellow-400">3.8</p>
                <p className="text-gray-500 text-sm">★★★★☆</p>
              </div>
            </div>

            <div className="bg-gray-950 rounded-xl p-4">
              <p className="text-xs text-purple-400 font-semibold mb-2">📋 SUMMARY</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Good sound quality and comfortable fit but battery life
                and connectivity issues are a concern for regular users...
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-900/10 border border-green-900/30 rounded-xl p-3">
                <p className="text-xs text-green-400 font-semibold mb-2">✅ PROS</p>
                <p className="text-gray-400 text-xs leading-relaxed">
                  • Great sound quality<br />
                  • Comfortable fit<br />
                  • Noise cancellation
                </p>
              </div>
              <div className="bg-red-900/10 border border-red-900/30 rounded-xl p-3">
                <p className="text-xs text-red-400 font-semibold mb-2">❌ CONS</p>
                <p className="text-gray-400 text-xs leading-relaxed">
                  • Short battery life<br />
                  • Connection drops<br />
                  • Overpriced
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-2">😊 SENTIMENT</p>
              <div className="flex rounded-full overflow-hidden h-3">
                <div className="bg-green-500" style={{ width: "55%" }} />
                <div className="bg-red-500" style={{ width: "30%" }} />
                <div className="bg-gray-600" style={{ width: "15%" }} />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>55% Positive</span>
                <span>30% Negative</span>
                <span>15% Neutral</span>
              </div>
            </div>

            <div className="bg-purple-900/20 border border-purple-800/40 rounded-xl p-3">
              <p className="text-purple-300 text-sm">
                🏆 Decent earbuds for casual use but not worth the premium
                price tag given the reliability issues.
              </p>
            </div>

          </div>

          {/* Right — text */}
          <div>
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              This is What You
              <br />
              <span className="text-purple-400">Get in Under 5s</span>
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Every analysis gives you a complete picture — not just
              a star rating. Understand exactly why a product is good
              or bad before you buy.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Works for any product category automatically",
                "Detects sarcasm and fake reviews accurately",
                "100% free — powered by Groq API",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-300 text-sm">
                  <span className="w-5 h-5 bg-purple-600/30 border border-purple-600 rounded-full flex items-center justify-center text-purple-400 text-xs shrink-0">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/analyzer"
              className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition"
            >
              ⚖️ Try It Now
            </Link>
          </div>

        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────── */}
      <div className="w-full bg-gray-900 border-t border-gray-800 px-6 py-24 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to Get Your Verdict?
        </h2>
        <p className="text-gray-500 text-base mb-10">
          No signup required. Completely free. Works for any product.
        </p>
        <Link
          to="/analyzer"
          className="px-12 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition text-base inline-block"
        >
          ⚖️ Get Verdict Now
        </Link>
      </div>

    </div>
  );
}

export default Landing;