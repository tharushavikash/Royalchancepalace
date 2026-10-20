import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadSettings, defaultSettings, type SiteSettings } from "../data/defaultData";

export default function Footer() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await loadSettings();
      if (data) setSettings(data);
    };
    fetchSettings();
  }, []);

  return (
    <footer className="bg-black text-white pt-16 pb-12 border-t border-amber-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={settings.logo}
                alt="Logo"
                className="h-10 w-10 rounded-full object-cover ring-2 ring-amber-500"
              />
              <div>
                <h3 className="text-lg font-bold tracking-tight text-white leading-tight">
                  {settings.businessName || "Royal Chance Palace"}
                </h3>
                <p className="text-xs text-amber-400 uppercase tracking-wider">
                  Palace Banquets
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              {settings.tagline || "Creating unforgettable memories in elegance. The finest modern reception hall in Yakkala."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-amber-400 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/wedding" className="hover:text-amber-400 transition-colors">Wedding</Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-amber-400 transition-colors">Packages & Menus</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-amber-400 transition-colors">Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-amber-400 mb-4">
              Contact Info
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2.5">
                <span className="text-amber-500 font-bold">📍</span>
                <span>{settings.address || "Yakkala, Sri Lanka"}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-amber-500 font-bold">📞</span>
                <a href={`tel:${settings?.phone?.replace(/\s/g, "")}`} className="hover:text-amber-400 transition-colors">
                  {settings.phone || "+94 7X XXX XXXX"}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-amber-500 font-bold">✉️</span>
                <a href={`mailto:${settings.email}`} className="hover:text-amber-400 transition-colors">
                  {settings.email || "info@royalchance.lk"}
                </a>
              </li>
            </ul>
          </div>

          {/* Business Hours / Note */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-amber-400 mb-4">
              Opening Hours
            </h4>
            <p className="text-sm text-gray-300 mb-2">
              Monday - Sunday: <br /><span className="text-amber-400 font-semibold">8:00 AM - 10:00 PM</span>
            </p>
            <p className="text-xs text-gray-400 mt-4">
              Available for weddings, corporate events, parties, and fine dining reservations.
            </p>
          </div>

        </div>

        {/* Bottom Copyright & Developed By */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} {settings.businessName || "Royal Chance Palace Banquets"}. All rights reserved.</p>
          <center><p className="text-gray-400">
            Developed by <span className="text-amber-400 font-semibold">Velixo Digital</span>
          </p></center>
        </div>
      </div>
    </footer>
  );
}