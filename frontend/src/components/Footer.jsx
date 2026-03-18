import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 border-t 
      border-gray-800 mt-16 w-full">
      <div className="w-full px-6 py-10">
        <div className="grid grid-cols-1 
          md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center 
              gap-2 mb-3">
              <span className="text-2xl">⚖️</span>
              <span className="font-bold text-xl">
                Verdict
              </span>
            </div>
            <p className="text-gray-500 text-sm 
              leading-relaxed">
              AI-powered product review analyzer 
              using Retrieval Augmented Generation 
              technology. Works for any product 
              category.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold 
              mb-3">
              Pages
            </h4>
            <ul className="space-y-2">
              {[
                { path: "/", label: "Home" },
                { path: "/analyzer", label: "Analyzer" },
                { path: "/how-it-works", label: "How It Works" },
                { path: "/about", label: "About" },
                { path: "/team", label: "Team" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-500 text-sm 
                      hover:text-purple-400 transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-white font-semibold 
              mb-3">
              Built With
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                "React.js",
                "Tailwind CSS",
                "Flask",
                "LangChain",
                "ChromaDB",
                "Groq AI",
                "Llama 3.3",
                "Python",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-gray-800 
                    text-gray-400 text-xs rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 
          mt-8 pt-6 flex flex-col md:flex-row 
          items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            © 2025 Verdict — BCA Final Year Project
          </p>
          <p className="text-gray-600 text-xs">
            Built with ❤️ using RAG + LLM Technology
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;