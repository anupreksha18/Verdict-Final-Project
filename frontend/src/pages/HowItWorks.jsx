function HowItWorks() {
  const steps = [
    {
      icon: "📋",
      title: "Step 1 — User Pastes Reviews",
      desc: "User copies reviews from any e-commerce website like Amazon or Flipkart and pastes them into the Verdict analyzer.",
      tech: "React.js Frontend"
    },
    {
      icon: "🧹",
      title: "Step 2 — Preprocessing",
      desc: "System cleans raw reviews by removing noise like dates, verified purchase tags, special characters, emojis and duplicates.",
      tech: "Python + Regex"
    },
    {
      icon: "🔢",
      title: "Step 3 — Vector Embeddings",
      desc: "Each cleaned review is converted into a vector (384 numbers) representing its meaning using Sentence Transformers.",
      tech: "Sentence Transformers (all-MiniLM-L6-v2)"
    },
    {
      icon: "💾",
      title: "Step 4 — Vector Storage",
      desc: "All review vectors are stored locally in ChromaDB vector database. No cloud storage needed — runs on your machine.",
      tech: "ChromaDB (Local)"
    },
    {
      icon: "🔍",
      title: "Step 5 — Retrieval",
      desc: "RAG retrieves top 50 most relevant reviews from ChromaDB based on semantic similarity — not just keyword matching.",
      tech: "LangChain + ChromaDB"
    },
    {
      icon: "🧠",
      title: "Step 6 — LLM Generation",
      desc: "Retrieved reviews are sent to Groq API with smart instructions to extract rating, summary, pros, cons, sentiment and aspects.",
      tech: "Groq API + Llama 3.3 70B"
    },
    {
      icon: "📊",
      title: "Step 7 — Results Display",
      desc: "Structured analysis is returned to React frontend and displayed as beautiful cards with charts and visualizations.",
      tech: "React.js + Recharts + Tailwind CSS"
    },
  ];

  const techStack = [
    { name: "React.js", role: "Frontend UI" },
    { name: "Tailwind CSS", role: "Styling" },
    { name: "Flask", role: "Backend API" },
    { name: "LangChain", role: "RAG Framework" },
    { name: "ChromaDB", role: "Vector Database" },
    { name: "Sentence Transformers", role: "Embeddings" },
    { name: "Groq API", role: "LLM Provider" },
    { name: "Llama 3.3 70B", role: "Language Model" },
  ];

  return (
    <div className="w-full px-6 py-12">

      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold 
          text-white mb-3">
          How Verdict Works
        </h1>
        <p className="text-gray-500">
          Understanding the RAG-based architecture 
          behind Verdict
        </p>
      </div>

      {/* What is RAG */}
      <div className="bg-purple-900/20 border 
        border-purple-800 rounded-2xl p-8 mb-10">
        <h2 className="text-purple-400 font-bold 
          text-2xl mb-4">
          🧠 What is RAG?
        </h2>
        <p className="text-gray-300 text-sm 
          leading-relaxed mb-4">
          RAG stands for Retrieval Augmented Generation.
          Instead of training a model on fixed data,
          RAG dynamically retrieves relevant information
          and feeds it to a Large Language Model to
          generate accurate, grounded responses.
        </p>
        <div className="bg-gray-900 rounded-xl p-5 
          font-mono text-sm text-gray-400 space-y-2">
          <p>❌ Traditional ML:</p>
          <p className="pl-4">
            Train model → Predict label only
          </p>
          <p className="mt-2">✅ RAG (Verdict):</p>
          <p className="pl-4 text-purple-400">
            Store reviews → Retrieve relevant → 
            Generate full insights
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 
        md:grid-cols-2 gap-6 mb-12">
        {steps.map((step, i) => (
          <div
            key={i}
            className="bg-gray-900 border 
              border-gray-800 rounded-2xl p-6
              flex gap-5 hover:border-purple-800
              transition"
          >
            <div className="text-4xl shrink-0">
              {step.icon}
            </div>
            <div>
              <h3 className="text-white font-semibold 
                mb-2">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm 
                leading-relaxed mb-3">
                {step.desc}
              </p>
              <span className="inline-block px-3 py-1 
                bg-purple-900/40 border 
                border-purple-800 text-purple-300 
                text-xs rounded-full">
                {step.tech}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Tech Stack */}
      <div className="bg-gray-900 border 
        border-gray-800 rounded-2xl p-8">
        <h2 className="text-white font-bold 
          text-2xl mb-6">
          🛠️ Tech Stack
        </h2>
        <div className="grid grid-cols-2 
          md:grid-cols-4 gap-4">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="bg-gray-800 rounded-xl 
                p-5 text-center hover:bg-gray-700
                transition"
            >
              <p className="text-white font-semibold 
                text-sm mb-1">
                {tech.name}
              </p>
              <p className="text-gray-500 text-xs">
                {tech.role}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default HowItWorks;