import { Link } from "react-router-dom";
import { BarChart3, MessageSquareText, ShieldAlert, ScanSearch } from "lucide-react";

function Landing() {

  const products = [
    {
      name: "Sony WH-1000XM5",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      rating: 4.7,
      tag: "Top Noise Cancelling"
    },
    {
      name: "iPhone Style Device",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      rating: 4.6,
      tag: "Most Popular"
    },
    {
      name: "MacBook Air",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      rating: 4.8,
      tag: "Best Performance"
    },
    {
      name: "Smart Watch",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      rating: 4.4,
      tag: "Daily Use"
    },
  ];

  const features = [
    { icon: <BarChart3 />, title: "Smart Rating", desc: "Turns reviews into clear scores." },
    { icon: <MessageSquareText />, title: "Instant Summary", desc: "Summarizes thousands of opinions." },
    { icon: <ScanSearch />, title: "Deep Analysis", desc: "Breaks product into key aspects." },
    { icon: <ShieldAlert />, title: "Trust Filter", desc: "Detects fake reviews automatically." },
  ];

  return (
    <div className="bg-white text-black">

      {/* ================= HERO ================= */}
      <section className="px-6 md:px-16 py-24 flex flex-col md:flex-row items-center gap-12">

        <div className="flex-1">

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Decide faster with <br />
            real review intelligence.
          </h1>

          <p className="text-gray-600 mt-6 text-lg max-w-xl">
            Verdict analyzes customer reviews and gives you clear buying decisions in seconds.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/analyzer"
              className="px-6 py-3 bg-black text-white rounded-xl hover:opacity-90"
            >
              Try Analyzer
            </Link>

            <a
              href="#products"
              className="px-6 py-3 border rounded-xl hover:bg-gray-100"
            >
              Explore Products
            </a>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            No login required • Instant results • Free tool
          </p>

        </div>

        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            className="rounded-2xl shadow-xl w-full"
          />
        </div>

      </section>

      {/* ================= PRODUCTS ================= */}
      <section id="products" className="px-6 md:px-16 py-20 bg-gray-50">

        <h2 className="text-3xl font-bold text-center mb-10">
          Popular Products
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          {products.map((p, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">

              <img src={p.image} className="h-44 w-full object-cover" />

              <div className="p-4">

                <p className="text-xs text-gray-500">{p.tag}</p>

                <h3 className="font-semibold mt-1">{p.name}</h3>

                <p className="text-sm text-gray-600 mt-2">
                  ⭐ {p.rating}/5
                </p>

              </div>

            </div>
          ))}

        </div>

      </section>

      {/* ================= FEATURES ================= */}
      <section className="px-6 md:px-16 py-20">

        <h2 className="text-3xl font-bold text-center mb-12">
          Why people use Verdict
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          {features.map((f, i) => (
            <div key={i} className="p-6 border rounded-2xl hover:shadow-md transition">

              <div className="mb-3">{f.icon}</div>

              <h3 className="font-semibold mb-2">{f.title}</h3>

              <p className="text-sm text-gray-600">{f.desc}</p>

            </div>
          ))}

        </div>

      </section>

      {/* ================= CTA ================= */}
      <section className="px-6 md:px-16 py-20 bg-black text-white text-center">

        <h2 className="text-4xl font-bold">
          Make better decisions instantly
        </h2>

        <p className="text-gray-300 mt-4">
          Stop reading reviews manually. Let AI do it.
        </p>

        <Link
          to="/analyzer"
          className="mt-8 inline-block px-8 py-3 bg-white text-black rounded-xl font-medium"
        >
          Start Now
        </Link>

      </section>

    </div>
  );
}

export default Landing;