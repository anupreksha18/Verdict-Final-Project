import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { path: "/", label: "Home" },
    { path: "/analyzer", label: "Analyzer" },
    { path: "/how-it-works", label: "How It Works" },
    { path: "/about", label: "About" },
    { path: "/team", label: "Team" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gray-900 border-b 
      border-gray-800 sticky top-0 z-50 w-full">
      <div className="w-full px-6 py-4 flex 
        items-center justify-between">

        {/* Logo */}
        <Link to="/" 
          className="flex items-center gap-2">
          <span className="text-2xl">⚖️</span>
          <span className="font-bold text-xl text-white">
            Verdict
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex 
          items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg 
                text-sm font-medium transition
                ${isActive(link.path)
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Try Now Button */}
        <Link
          to="/analyzer"
          className="hidden md:block px-4 py-2 
            bg-purple-600 hover:bg-purple-700 
            text-white text-sm font-semibold 
            rounded-xl transition"
        >
          ⚡ Try Now
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-400 
            hover:text-white text-xl"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t 
          border-gray-800 px-6 py-3 space-y-1">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 rounded-lg 
                text-sm font-medium transition
                ${isActive(link.path)
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/analyzer"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 bg-purple-600 
              text-white text-sm font-semibold 
              rounded-xl text-center mt-2"
          >
            ⚡ Try Now
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;