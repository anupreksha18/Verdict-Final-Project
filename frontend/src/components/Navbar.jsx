import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { path: "/",             label: "Home"         },
    { path: "/analyzer",     label: "Analyzer"     },
    { path: "/how-it-works", label: "How it works" },
    { path: "/about",        label: "About"        },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">

      <div className="px-6 md:px-16 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <svg width="36" height="36" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="52" height="52" rx="12" fill="#111"/>
            <path d="M14 15L26 33L38 15" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="26" y1="33" x2="26" y2="39" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="19" y1="39" x2="33" y2="39" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <span className="font-semibold text-black text-lg tracking-tight">
            Verdict
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex gap-8 text-sm">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className="relative text-gray-600 hover:text-black transition"
            >
              {l.label}
              {isActive(l.path) && (
                <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-black rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/analyzer"
          className="hidden md:block px-4 py-2 text-sm font-medium border border-black text-black rounded-md hover:bg-black hover:text-white transition"
        >
          Try Now
        </Link>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-black text-2xl"
        >
          {open ? "✕" : "☰"}
        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-3 border-t border-gray-200 bg-white">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setOpen(false)}
              className="block text-gray-600 hover:text-black transition"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/analyzer"
            onClick={() => setOpen(false)}
            className="block mt-4 px-4 py-2 border border-black text-black text-center rounded-md"
          >
            Try Now
          </Link>
        </div>
      )}

    </nav>
  );
}

export default Navbar;