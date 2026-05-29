import { Link } from "react-router-dom";
import img1 from '../assets/img1 (1).jpg';
import img2 from '../assets/img2 (1).jpg';
import img3 from '../assets/img3 (1).jpg';
import img4 from '../assets/img4 (1).jpg';
import img5 from '../assets/img5 (1).jpg';
import img6 from '../assets/img6 (1).jpg';

function About() {
  return (
    <div className="w-full bg-white text-black">

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-28 overflow-hidden">

        {/* background image */}
        <div className="absolute inset-0 -z-10">
          <img
            src={img1}
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Human Insight,
          <br />
          <span className="text-gray-500">scaled with intelligence</span>
        </h1>

        <p className="text-gray-500 max-w-2xl mt-6 text-base md:text-lg leading-relaxed">
          We transform scattered customer opinions into structured,
          decision-ready insights in seconds.
        </p>

        <div className="w-24 h-[2px] bg-black mt-10 opacity-10" />
      </section>

      {/* ================= MISSION ================= */}
      <section className="py-28 px-6 md:px-20 bg-gray-50">

        <div className="grid md:grid-cols-2 gap-14 max-w-6xl mx-auto items-center">

          {/* LEFT TEXT */}
          <div>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase">
              Purpose
            </p>

            <h2 className="text-4xl font-bold mt-3 mb-6">
              Our Mission
            </h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              Customer feedback is powerful but chaotic. We convert that chaos
              into clarity using AI-driven semantic understanding.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Every decision becomes faster, clearer, and more reliable.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="rounded-2xl overflow-hidden border bg-white shadow-sm">
            <img
              src={img2}
              className="w-full h-72 object-cover"
            />
            <div className="p-5">
              <p className="text-sm text-gray-500">
                Turning raw feedback into structured intelligence
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="py-28 px-6 md:px-20">

        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-3">
              What we stand for
            </h2>
            <p className="text-gray-500">
              Core principles behind the system
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                title: "Clarity",
                desc: "We turn noisy feedback into structured insights.",
                img: img2,
              },
              {
                title: "Speed",
                desc: "Thousands of reviews processed in seconds.",
                img: img3,
              },
              {
                title: "Trust",
                desc: "We preserve meaning so insights stay reliable.",
                img: img4,
              },
            ].map((v) => (
              <div
                key={v.title}
                className="p-6 rounded-2xl border bg-white hover:shadow-md transition"
              >
                <img
                  src={v.img}
                  className="h-36 w-full object-cover rounded-xl mb-4"
                />

                <h3 className="font-semibold text-lg mb-2">
                  {v.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= PROBLEM / SOLUTION ================= */}
      <section className="py-28 px-6 md:px-20 bg-gray-50">

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

          {/* PROBLEM */}
          <div className="bg-white border rounded-2xl p-8">

            <img
              src={img5}
              className="h-40 w-full object-cover rounded-xl mb-6"
            />

            <p className="text-xs text-red-500 uppercase tracking-widest mb-4">
              Problem
            </p>

            <h3 className="text-2xl font-bold mb-4">
              Information overload
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              People cannot manually process thousands of reviews effectively.
            </p>

            <ul className="space-y-2 text-sm text-gray-500">
              <li>• Cognitive overload</li>
              <li>• Slow decisions</li>
              <li>• Biased interpretation</li>
            </ul>
          </div>

          {/* SOLUTION */}
          <div className="bg-black text-white rounded-2xl p-8">

            <img
              src={img6}
              className="h-40 w-full object-cover rounded-xl mb-6"
            />

            <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">
              Solution
            </p>

            <h3 className="text-2xl font-bold mb-4">
              AI-powered synthesis engine
            </h3>

            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              We convert unstructured reviews into clear, actionable insights instantly.
            </p>

            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Full coverage analysis</li>
              <li>• Semantic understanding</li>
              <li>• Instant summarization</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-28 px-6 text-center">

        <h2 className="text-4xl font-bold mb-4">
          Ready to make better decisions?
        </h2>

        <p className="text-gray-500 max-w-xl mx-auto mb-8">
          Stop reading endless reviews. Start getting structured insights instantly.
        </p>

        <Link to="/analyzer" className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition">
          Get Started
        </Link>

      </section>

    </div>
  );
}

export default About;