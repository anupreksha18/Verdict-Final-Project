import { Link } from "react-router-dom";

function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Paste Reviews",
      desc: "Copy reviews from Amazon, Flipkart, or any marketplace. You can also analyze product URLs or search products from datasets.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    },
    {
      step: "02",
      title: "AI Understands Feedback",
      desc: "Verdict processes review text, detects sentiment, identifies important product aspects, and extracts meaningful patterns.",
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    },
    {
      step: "03",
      title: "Generate Insights",
      desc: "The system creates summaries, identifies pros and cons, detects suspicious reviews, and calculates ratings.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    },
    {
      step: "04",
      title: "Make Better Decisions",
      desc: "Receive a complete product verdict without reading hundreds of reviews manually.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    },
  ];

  const outputs = [
    "Overall Rating",
    "AI Summary",
    "Pros & Cons",
    "Sentiment Analysis",
    "Aspect Scores",
    "Fake Review Detection",
  ];

  const technologies = [
    {
      title: "Frontend",
      desc: "React + Tailwind CSS",
    },
    {
      title: "Backend",
      desc: "Flask API",
    },
    {
      title: "AI Layer",
      desc: "LangChain + Llama",
    },
    {
      title: "Vector Database",
      desc: "ChromaDB",
    },
  ];

  return (
    <div className="bg-white text-black">

      {/* HERO */}
      <section className="px-6 md:px-16 py-24">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">
              How it works
            </p>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Turn thousands of reviews into actionable insights
            </h1>

            <p className="text-gray-600 text-lg mt-6 max-w-xl">
              Verdict analyzes customer feedback using AI and transforms raw reviews into ratings, summaries, sentiment insights, and buying recommendations.
            </p>

            <Link
              to="/analyzer"
              className="inline-block mt-8 px-7 py-3 bg-black text-white rounded-xl"
            >
              Try Analyzer
            </Link>

          </div>

          <div className="bg-gray-50 border rounded-3xl p-6 shadow-sm">

            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
              alt=""
              className="rounded-2xl w-full h-[420px] object-cover"
            />

          </div>

        </div>

      </section>

      {/* PROCESS SECTION */}
      <section className="bg-gray-50 py-24 px-6 md:px-16">

        <div className="max-w-7xl mx-auto">

          <div className="mb-20">

            <h2 className="text-4xl font-bold">
              From raw reviews to clear decisions
            </h2>

            <p className="text-gray-600 mt-3">
              A simple AI pipeline designed to save hours of manual review reading.
            </p>

          </div>

          <div className="space-y-24">

            {steps.map((step, index) => (
              <div
                key={step.step}
                className="grid lg:grid-cols-2 gap-16 items-center"
              >

                <div
                  className={`${
                    index % 2 !== 0 ? "lg:order-2" : ""
                  }`}
                >
                  <p className="text-sm font-medium text-gray-400 mb-3">
                    STEP {step.step}
                  </p>

                  <h3 className="text-4xl font-bold mb-5">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 text-lg leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div
                  className={`${
                    index % 2 !== 0 ? "lg:order-1" : ""
                  }`}
                >
                  <div className="bg-white border rounded-3xl p-5 shadow-sm">

                    <img
                      src={step.image}
                      alt=""
                      className="rounded-2xl h-[320px] w-full object-cover"
                    />

                  </div>
                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* OUTPUTS */}
      <section className="py-24 px-6 md:px-16">

        <div className="max-w-7xl mx-auto">

          <div className="mb-14">

            <h2 className="text-4xl font-bold">
              What you receive
            </h2>

            <p className="text-gray-600 mt-3">
              Every analysis generates structured insights ready for decision making.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {outputs.map((item) => (
              <div
                key={item}
                className="bg-white border rounded-2xl p-6 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg">
                  {item}
                </h3>

                <p className="text-gray-500 text-sm mt-2">
                  Automatically generated by Verdict AI.
                </p>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* TECH STACK */}
      <section className="bg-gray-50 py-24 px-6 md:px-16">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-bold mb-3">
            Built with modern technology
          </h2>

          <p className="text-gray-600 mb-12">
            Powerful tools working together behind the scenes.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {technologies.map((tech) => (
              <div
                key={tech.title}
                className="bg-white border rounded-2xl p-6"
              >
                <p className="text-sm text-gray-400 mb-2">
                  {tech.title}
                </p>

                <h3 className="font-semibold text-lg">
                  {tech.desc}
                </h3>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="bg-black text-white py-24 px-6 md:px-16 text-center">

        <h2 className="text-5xl font-bold">
          Ready to analyze reviews?
        </h2>

        <p className="text-gray-300 mt-5 text-lg max-w-2xl mx-auto">
          Stop reading hundreds of reviews manually. Let AI summarize everything in seconds.
        </p>

        <Link
          to="/analyzer"
          className="inline-block mt-8 px-8 py-3 bg-white text-black rounded-xl font-medium"
        >
          Start Analyzing
        </Link>

      </section>

    </div>
  );
}

export default HowItWorks;