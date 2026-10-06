import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadSettings, loadPackages, type PackageItem } from "../data/defaultData";

const categoryTabs = [
  { id: "all", label: "All Packages", icon: "🎉" },
  { id: "wedding", label: "Weddings", icon: "💍" },
  { id: "birthday", label: "Birthdays", icon: "🎂" },
  { id: "corporate", label: "Corporate", icon: "💼" },
  { id: "other", label: "Other Events", icon: "✨" },
] as const;

export default function Packages() {
  const settings = loadSettings();
  const packages = loadPackages();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredPackages =
    activeCategory === "all"
      ? packages
      : packages.filter((p) => p.category === activeCategory);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/17931466/pexels-photo-17931466.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Royal Chance Palace Banquets
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
            Our Packages
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-gray-200">
            Choose from our carefully curated packages designed to make every celebration
            unforgettable. All prices are in Sri Lankan Rupees (LKR).
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 sm:gap-3 overflow-x-auto py-4 scrollbar-hide">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 sm:px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  activeCategory === tab.id
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/30"
                    : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredPackages.length === 0 ? (
            <div className="py-20 text-center text-gray-400">
              <p className="text-5xl mb-4">📦</p>
              <p>No packages in this category yet.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredPackages.map((pkg: PackageItem) => (
                <div
                  key={pkg.id}
                  className={`group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg ring-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                    pkg.popular ? "ring-amber-400" : "ring-gray-100"
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute top-4 right-4 z-10 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      Most Popular
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {pkg.capacity}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      {pkg.description}
                    </p>

                    {/* Price */}
                    <div className="mt-4 flex items-baseline gap-1.5">
                      <span className="text-sm font-medium text-gray-500">{pkg.currency}</span>
                      <span className="text-3xl font-bold text-amber-600">{pkg.price}</span>
                    </div>

                    {/* Features (expandable) */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        expandedId === pkg.id ? "max-h-96 mt-4" : "max-h-0"
                      }`}
                    >
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        What's Included
                      </p>
                      <ul className="space-y-2">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <svg className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 flex gap-2">
                      <button
                        onClick={() => toggleExpand(pkg.id)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full border-2 border-amber-500 px-4 py-2.5 text-sm font-semibold text-amber-600 transition-all hover:bg-amber-50"
                      >
                        {expandedId === pkg.id ? "Hide Details" : "View Details"}
                        <svg
                          className={`h-4 w-4 transition-transform ${expandedId === pkg.id ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </button>
                      <a
                        href={`tel:${settings.phone.replace(/\s/g, "")}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:from-amber-600 hover:to-amber-700"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                        Book Now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Custom Package CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 sm:p-12 text-center shadow-2xl">
            <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-amber-500/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-amber-400/10 blur-3xl" />
            <div className="relative">
              <div className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Need a Custom Package?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-300">
                Every celebration is unique. Contact us to create a tailor-made package that
                perfectly fits your event, budget, and vision.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <a
                  href={`tel:${settings.phone.replace(/\s/g, "")}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-3.5 text-base font-semibold text-white shadow-xl transition-all hover:from-amber-600 hover:to-amber-700"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  {settings.phone}
                </a>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-white hover:text-gray-900"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
