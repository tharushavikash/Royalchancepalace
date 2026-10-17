import { useEffect, useState } from "react";
import { loadSettings } from "../data/defaultData";

export default function AboutSection() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await loadSettings();
        if (data) setSettings(data);
      } catch (error) {
        console.error("Error loading about settings:", error);
      }
    };
    fetchSettings();
  }, []);

  if (!settings) return null;

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* වම් පස: පින්තූරය සහ Gold Box එක */}
          <div className="relative">
            <div className="aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-gray-200">
              <img
                src={settings?.heroImage || "https://images.pexels.com/photos/16935999/pexels-photo-16935999.jpeg"} 
                alt="About Royal Chance Palace"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            
            {/* Decorative Gold Box */}
            <div className="hidden sm:flex absolute -bottom-8 -right-4 h-40 w-40 flex-col items-center justify-center rounded-2xl border-4 border-amber-500 bg-black p-4 shadow-2xl">
              <span className="text-4xl font-extrabold text-amber-500">Premium</span>
              <span className="mt-2 text-center text-xs font-bold uppercase tracking-widest text-white">
                Banquet<br />Services
              </span>
            </div>
          </div>

          {/* දකුණු පස: විස්තරය */}
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-[0.2em] text-amber-500">
              About {settings?.businessName || "Us"}
            </h2>
            <h3 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black leading-tight">
              Where Elegance Meets <span className="text-amber-500">Celebration</span>
            </h3>
            <div className="mt-6 h-1 w-20 bg-gradient-to-r from-amber-500 to-amber-200 rounded-full"></div>
            
            <p className="mt-6 text-base sm:text-lg text-gray-700 leading-relaxed">
              {settings?.aboutText || "Loading our story..."}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="/gallery"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-black rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
              >
                Explore Gallery
              </a>
              <a
                href={`tel:${settings?.phone?.replace(/\s/g, "") || ""}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-amber-600 bg-white border-2 border-amber-500 rounded-full hover:bg-amber-500 hover:text-white transition-all shadow-lg hover:shadow-xl"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                Contact Us
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}