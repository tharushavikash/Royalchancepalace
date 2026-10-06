import { useEffect } from "react";
import GalleryGrid from "../components/GalleryGrid";
import { loadGallery, loadSettings } from "../data/defaultData";

export default function GalleryPage() {
  const gallery = loadGallery();
  const settings = loadSettings();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = Array.from(new Set(gallery.map((img) => img.category)));

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/16935999/pexels-photo-16935999.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            {settings.businessName}
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
            Our Gallery
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-gray-200">
            Explore the elegant spaces, exquisite decorations, delicious cuisine, and joyful
            moments we've been honored to host.
          </p>
          {/* Stats */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <span className="rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-md ring-1 ring-white/20">
              📸 {gallery.length} Photos
            </span>
            {categories.map((cat) => (
              <span
                key={cat}
                className="rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-amber-300 backdrop-blur-md ring-1 ring-white/20"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <GalleryGrid images={gallery} showCategoryFilter />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Want to Create Your Own Memories?
          </h2>
          <p className="mt-4 text-gray-600">
            Book your event at Royal Chance Palace Banquets and let us turn your vision into a
            beautiful reality.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href={`tel:${settings.phone.replace(/\s/g, "")}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-3.5 text-base font-semibold text-white shadow-xl transition-all hover:from-amber-600 hover:to-amber-700"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              Call {settings.phone}
            </a>
            <a
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-amber-500 px-8 py-3.5 text-base font-semibold text-amber-600 transition-all hover:bg-amber-500 hover:text-white"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
