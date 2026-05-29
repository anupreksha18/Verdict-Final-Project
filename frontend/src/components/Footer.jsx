import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">

      <div className="px-6 md:px-16 py-14">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* BRAND */}
          <div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold text-black">
                ⚖️ Verdict
              </span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              Verdict helps you understand product reviews instantly
              using AI-driven analysis. Faster decisions, less confusion.
            </p>

          </div>

          {/* LINKS */}
          <div>

            <h4 className="font-semibold mb-4 text-black">
              Pages
            </h4>

            <ul className="space-y-2 text-sm text-gray-600">

              {[
                { path: "/", label: "Home" },
                { path: "/analyzer", label: "Analyzer" },
                { path: "/how-it-works", label: "How it works" },
                { path: "/about", label: "About" },
              ].map((l) => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className="hover:text-black transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}

            </ul>

          </div>

          {/* INFO */}
          <div>

            <h4 className="font-semibold mb-4 text-black">
              What it does
            </h4>

            <p className="text-sm text-gray-600 leading-relaxed">
              • Summarizes reviews<br />
              • Detects sentiment<br />
              • Extracts pros & cons<br />
              • Helps buying decisions
            </p>

          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between gap-3 text-sm text-gray-500">

          <p>© 2026 Verdict. All rights reserved.</p>

          <p>Built for smarter product decisions</p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;