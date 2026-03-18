function About() {
  const problems = [
    "Reading hundreds of reviews manually is time consuming",
    "Reviews contain sarcasm and negation that confuse basic models",
    "Traditional ML models only classify — they don't explain",
    "Static models can't handle new product categories",
  ];

  const solutions = [
    "RAG system retrieves and analyzes reviews dynamically",
    "Llama 3.3 70B handles sarcasm, negation and mixed reviews",
    "System generates full analysis — not just a label",
    "Works for ANY product category automatically",
  ];

  return (
    <div className="w-full px-6 py-12">

      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold 
          text-white mb-3">
          About Verdict
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          E-Commerce Product Rating System Based on
          Customer Review Mining Using RAG
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 
        md:grid-cols-4 gap-4 mb-6">
        {[
          { value: "7", label: "Analysis Points" },
          { value: "Any", label: "Product Category" },
          { value: "₹0", label: "Total Cost" },
          { value: "< 5s", label: "Response Time" },
        ].map((stat) => (
          <div key={stat.label}
            className="bg-gray-900 border 
              border-gray-800 rounded-2xl p-6 
              text-center">
            <p className="text-3xl font-bold 
              text-purple-400 mb-2">
              {stat.value}
            </p>
            <p className="text-gray-500 text-xs">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Overview */}
      <div className="bg-gray-900 border 
        border-gray-800 rounded-2xl p-8 mb-6">
        <h2 className="text-purple-400 font-bold 
          text-2xl mb-4">
          📌 Project Overview
        </h2>
        <p className="text-gray-300 text-sm 
          leading-relaxed mb-4">
          Verdict is an AI-powered e-commerce product
          rating system that uses Retrieval Augmented
          Generation (RAG) to analyze customer reviews
          and provide comprehensive product insights.
        </p>
        <p className="text-gray-300 text-sm 
          leading-relaxed">
          Unlike traditional sentiment analysis models
          that only classify reviews as positive or
          negative, Verdict provides a complete analysis
          including star ratings, summaries, pros and
          cons, aspect-wise ratings and fake review
          detection — for any product category.
          No training required. No dataset needed.
          Just paste reviews and get instant results.
        </p>
      </div>

      {/* Problem & Solution */}
      <div className="grid grid-cols-1 
        md:grid-cols-2 gap-6 mb-6">

        <div className="bg-red-900/10 border 
          border-red-900 rounded-2xl p-8">
          <h2 className="text-red-400 font-bold 
            text-xl mb-5">
            ❌ Problem Statement
          </h2>
          <ul className="space-y-4">
            {problems.map((p, i) => (
              <li key={i}
                className="flex items-start gap-3">
                <span className="text-red-500 
                  shrink-0 mt-0.5 text-lg">
                  •
                </span>
                <span className="text-gray-300 text-sm">
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-green-900/10 border 
          border-green-900 rounded-2xl p-8">
          <h2 className="text-green-400 font-bold 
            text-xl mb-5">
            ✅ Our Solution
          </h2>
          <ul className="space-y-4">
            {solutions.map((s, i) => (
              <li key={i}
                className="flex items-start gap-3">
                <span className="text-green-500 
                  shrink-0 mt-0.5 text-lg">
                  •
                </span>
                <span className="text-gray-300 text-sm">
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-900 border 
        border-gray-800 rounded-2xl p-8 mb-6">
        <h2 className="text-purple-400 font-bold 
          text-2xl mb-6">
          ⚙️ How Verdict Works
        </h2>
        <div className="grid grid-cols-1 
          md:grid-cols-3 gap-4">
          {[
            {
              icon: "📋",
              title: "Paste Reviews",
              desc: "Copy reviews from any e-commerce site and paste them in"
            },
            {
              icon: "🧠",
              title: "RAG Analyzes",
              desc: "System retrieves key insights using RAG + Llama 3.3 70B"
            },
            {
              icon: "⚖️",
              title: "Get Verdict",
              desc: "Receive rating, summary, pros, cons and full analysis"
            },
          ].map((item) => (
            <div key={item.title}
              className="bg-gray-800 rounded-xl 
                p-6 text-center">
              <div className="text-4xl mb-3">
                {item.icon}
              </div>
              <h3 className="text-white font-semibold 
                mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm 
                leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* What Verdict Analyzes */}
      <div className="bg-gray-900 border 
        border-gray-800 rounded-2xl p-8 mb-6">
        <h2 className="text-purple-400 font-bold 
          text-2xl mb-6">
          📊 What Verdict Analyzes
        </h2>
        <div className="grid grid-cols-1 
          md:grid-cols-2 gap-4">
          {[
            {
              icon: "⭐",
              title: "Overall Rating",
              desc: "AI calculates accurate 1-5 star rating"
            },
            {
              icon: "📋",
              title: "Summary",
              desc: "3-4 line summary of all reviews"
            },
            {
              icon: "✅",
              title: "Pros",
              desc: "Top positive points customers mention"
            },
            {
              icon: "❌",
              title: "Cons",
              desc: "Top negative points customers mention"
            },
            {
              icon: "😊",
              title: "Sentiment Analysis",
              desc: "Positive, negative, neutral percentage"
            },
            {
              icon: "🔍",
              title: "Aspect Analysis",
              desc: "Auto detected aspects rated individually"
            },
            {
              icon: "⚠️",
              title: "Fake Detection",
              desc: "Suspicious reviews identified automatically"
            },
            {
              icon: "🏆",
              title: "Final Verdict",
              desc: "One powerful conclusion line"
            },
          ].map((item) => (
            <div key={item.title}
              className="flex items-start gap-4
                bg-gray-800 rounded-xl p-4">
              <span className="text-2xl shrink-0">
                {item.icon}
              </span>
              <div>
                <h3 className="text-white font-semibold 
                  text-sm mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-xs">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Objectives */}
      <div className="bg-gray-900 border 
        border-gray-800 rounded-2xl p-8">
        <h2 className="text-purple-400 font-bold 
          text-2xl mb-6">
          🎯 Objectives
        </h2>
        <div className="grid grid-cols-1 
          md:grid-cols-2 gap-4">
          {[
            "Build a domain-agnostic review analysis system",
            "Implement RAG architecture for dynamic retrieval",
            "Handle real-world challenges like sarcasm and negation",
            "Provide aspect-level analysis for any product",
            "Detect potentially fake or suspicious reviews",
            "Create a clean, user-friendly web interface",
          ].map((obj, i) => (
            <div key={i}
              className="flex items-center gap-4
                bg-gray-800 rounded-xl p-4">
              <span className="w-8 h-8 rounded-full 
                bg-purple-900/50 border border-purple-700
                text-purple-400 text-sm flex items-center 
                justify-center shrink-0 font-bold">
                {i + 1}
              </span>
              <span className="text-gray-300 text-sm">
                {obj}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default About;
