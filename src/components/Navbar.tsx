import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { loadSettings, defaultSettings, type SiteSettings } from "../data/defaultData";

export default function Navbar() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchLogo = async () => {
      const fetched = await loadSettings();
      if (fetched) setSettings(fetched);
    };
    fetchLogo();

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Wedding", path: "/wedding" },
    { name: "Packages", path: "/packages" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-gradient-to-b from-black/70 via-black/40 to-transparent py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Full Brand Name (Visible on all screens) */}
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src={settings.logo}
              alt="Royal Chance Palace Logo"
              className="h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover ring-2 ring-amber-500 shadow-md shrink-0"
            />
            <div className="flex flex-col">
              <span
                className={`text-xs sm:text-lg font-bold tracking-tight leading-tight transition-colors ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Royal Chance
              </span>
              <span
                className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-colors ${
                  isScrolled ? "text-amber-600" : "text-amber-400"
                }`}
              >
                Palace Banquets
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-amber-500 font-bold"
                      : isScrolled
                      ? "text-gray-700 hover:text-amber-600"
                      : "text-white/90 hover:text-amber-400"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Call Now Button */}
          <div className="hidden md:flex items-center">
            <a
              href={`tel:${settings?.phone?.replace(/\s/g, "") || ""}`}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:from-amber-600 hover:to-amber-700 hover:scale-105"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              Call Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden rounded-lg p-2 transition-colors ${
              isScrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
            }`}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 shadow-lg">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-base font-semibold text-gray-700 hover:bg-amber-50 hover:text-amber-600"
              >
                {link.name}
              </Link>
            ))}
            <a
              href={`tel:${settings?.phone?.replace(/\s/g, "") || ""}`}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-amber-500 py-3 text-center text-sm font-bold text-white shadow"
            >
              Call Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}