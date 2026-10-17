import { useEffect, useState } from "react";
import AboutSection from "../components/AboutSection";
import { loadSettings } from "../data/defaultData";

export default function AboutPage() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0); // පිටුවට ආපු ගමන් උඩටම Scroll වීම
    const fetchSettings = async () => {
      try {
        const data = await loadSettings();
        if (data) setSettings(data);
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={settings?.heroImage || "https://images.pexels.com/photos/16935999/pexels-photo-16935999.jpeg"}
            alt="About Us Cover"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            {settings?.businessName || "Royal Chance Palace"}
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
            About Us
          </h1>
        </div>
      </section>

      {/* About Section Component */}
      <AboutSection />
    </div>
  );
}