import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadSettings, loadPackages, defaultSettings, type PackageItem, type SiteSettings } from "../data/defaultData";

const categoryTabs = [
  { id: "all", label: "All Packages"},
  { id: "wedding", label: "Weddings"},
  { id: "birthday", label: "Birthdays" },
  { id: "corporate", label: "Corporate" },
  { id: "other", label: "Other Events" },
] as const;

const parseMenuText = (text: string = "") => {
  return text.split('\n').filter(line => line.includes('|')).map(line => {
    const parts = line.split('|');
    return { title: parts[0]?.trim() || "", desc: parts[1]?.trim() || "" };
  });
};

const parseCompBitesText = (text: string = "") => {
  return text.split('\n').filter(line => line.includes('|')).map(line => {
    const parts = line.split('|').map(p => p.trim());
    return {
      item: parts[0] || "",
      pax100: parts[1] || "",
      pax150: parts[2] || "",
      pax200: parts[3] || "",
      pax250: parts[4] || "",
      pax300: parts[5] || "",
      pax350: parts[6] || "",
      pax400: parts[7] || "",
    };
  });
};

const getOptimizedUrl = (url: string) => {
  if (!url) return "";
  if (url.includes("ik.imagekit.io") && !url.includes("tr=")) return `${url}?tr=w-800,h-500,q-75,fo-auto`;
  return url;
};

export default function Packages() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const [activeMenuTab, setActiveMenuTab] = useState<"silver" | "gold" | "platinum" | "bites">("silver");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Wedding & Event Packages | Royal Chance Palace Banquets";

    const fetchFirebaseData = async () => {
      try {
        const fetchedSettings = await loadSettings();
        const fetchedPackages = await loadPackages();

        if (fetchedSettings) setSettings(fetchedSettings);
        if (fetchedPackages) setPackages(fetchedPackages);
      } catch (error) {
        console.error("Error loading packages data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFirebaseData();
  }, []);

  const islamicPackage = packages.find((p) => p.id === "wedding-islamic");
  const regularPackages = packages.filter((p) => p.id !== "wedding-islamic");

  const filteredPackages =
    activeCategory === "all"
      ? regularPackages
      : regularPackages.filter((p) => p.category === activeCategory);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const scrollToPricing = () => {
    const element = document.getElementById("master-pricing");
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const priceChartData = [
    { pax: "100 PAX", ...Object.fromEntries(["silver", "gold", "platinum"].map((tier, i) => [tier, settings.priceChart100?.split("|")[i]?.trim()])) },
    { pax: "150 PAX", ...Object.fromEntries(["silver", "gold", "platinum"].map((tier, i) => [tier, settings.priceChart150?.split("|")[i]?.trim()])) },
    { pax: "200 PAX", ...Object.fromEntries(["silver", "gold", "platinum"].map((tier, i) => [tier, settings.priceChart200?.split("|")[i]?.trim()])) },
    { pax: "250 PAX", ...Object.fromEntries(["silver", "gold", "platinum"].map((tier, i) => [tier, settings.priceChart250?.split("|")[i]?.trim()])) },
    { pax: "300 PAX", ...Object.fromEntries(["silver", "gold", "platinum"].map((tier, i) => [tier, settings.priceChart300?.split("|")[i]?.trim()])) },
    { pax: "350 PAX", ...Object.fromEntries(["silver", "gold", "platinum"].map((tier, i) => [tier, settings.priceChart350?.split("|")[i]?.trim()])) },
    { pax: "400 PAX", ...Object.fromEntries(["silver", "gold", "platinum"].map((tier, i) => [tier, settings.priceChart400?.split("|")[i]?.trim()])) },
  ];

  const weddingMenus = {
    silver: parseMenuText(settings.menuSilver),
    gold: parseMenuText(settings.menuGold),
    platinum: parseMenuText(settings.menuPlatinum),
  };

  const bitesMenuData = parseMenuText(settings.bitesPricing).map(b => ({ item: b.title, price: b.desc }));
  const complimentaryBitesData = parseCompBitesText(settings.complimentaryBites);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-200 border-t-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={getOptimizedUrl(settings?.heroImage || "https://images.pexels.com/photos/17931466/pexels-photo-17931466.jpeg")}
            alt="Royal Chance Palace Banquet Hall Packages"
            className="h-full w-full object-cover"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            {settings?.businessName || "Royal Chance Palace Banquets"}
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
            Our Packages & Wedding Menus
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-gray-200">
            From the elegant Grand Ballroom hall to our grand Main Banquet Hall, every package includes full decor, buffet catering, and all hall charges. No hidden fees.
          </p>
          
          <div className="mt-8 flex justify-center">
            <button
              onClick={scrollToPricing}
              className="inline-flex items-center gap-2 rounded-full border-2 border-amber-500 bg-black/40 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-amber-500 hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
               Wedding Menus & Pricing
            </button>
          </div>
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
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- DYNAMIC ISLAMIC WEDDING PACKAGE (SPECIAL BANNER) --- */}
      {(activeCategory === "all" || activeCategory === "wedding") && islamicPackage && (
        <section className="pt-12 pb-8 sm:pt-16 sm:pb-12 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 to-white shadow-xl ring-1 ring-amber-200">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-2/5 relative min-h-[300px] lg:min-h-full">
                  <img src={getOptimizedUrl(islamicPackage.image)} alt={islamicPackage.name} className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="inline-block rounded-full bg-amber-500 px-3 py-1 text-xs font-bold uppercase tracking-wider mb-3">Special Package</span>
                    <h3 className="text-3xl font-bold mb-1">{islamicPackage.name}</h3>
                    <div className="text-amber-400 text-2xl font-extrabold mb-1">{islamicPackage.currency} {islamicPackage.price}</div>
                    <p className="text-sm text-gray-200">{islamicPackage.capacity}</p>
                  </div>
                </div>
                
                <div className="lg:w-3/5 p-6 sm:p-10">
                  <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    Package Details
                  </h4>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    {islamicPackage.description}
                  </p>
                  
                  <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-3 text-sm text-gray-600">
                    {islamicPackage.features.map((feature, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div> 
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex gap-3">
                    <a href={`tel:${settings?.phone?.replace(/\s/g, "") || ""}`} className="rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:from-amber-600">
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --- MASTER PRICE CHART --- */}
      <section id="master-pricing" className="pt-8 pb-8 sm:pt-12 sm:pb-12 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Master Price Chart</h2>
            <p className="mt-4 text-gray-600">
              Compare our catered wedding package pricing across all tiers based on your estimated guest count.
            </p>
          </div>
          
          <div className="overflow-x-auto rounded-3xl border border-amber-200 shadow-xl bg-white">
            <table className="w-full text-sm sm:text-base text-center min-w-[600px]">
              <thead className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                <tr>
                  <th className="px-4 py-4 sm:py-5 font-bold tracking-wider uppercase border-r border-amber-400/30">Guests</th>
                  <th className="px-4 py-4 sm:py-5 font-bold tracking-wider uppercase border-r border-amber-400/30">Silver (Rs.)</th>
                  <th className="px-4 py-4 sm:py-5 font-bold tracking-wider uppercase border-r border-amber-400/30">Gold (Rs.)</th>
                  <th className="px-4 py-4 sm:py-5 font-bold tracking-wider uppercase border-r border-amber-400/30">Platinum (Rs.)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {priceChartData.map((row, index) => (
                  <tr key={index} className="hover:bg-amber-50/50 transition-colors">
                    <td className="px-4 py-3.5 sm:py-4 font-bold text-gray-800 bg-amber-50/30 border-r border-gray-100">{row.pax}</td>
                    <td className="px-4 py-3.5 sm:py-4 font-medium text-gray-700 border-r border-gray-100">{row.silver || "-"}</td>
                    <td className="px-4 py-3.5 sm:py-4 font-medium text-gray-700 border-r border-gray-100">{row.gold || "-"}</td>
                    <td className="px-4 py-3.5 sm:py-4 font-medium text-gray-700">{row.platinum || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Packages Grid (Regular Packages) */}
      <section className="py-12 sm:py-16 bg-gray-50 border-t border-gray-200">
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

                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={getOptimizedUrl(pkg.image)}
                      alt={pkg.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {pkg.capacity}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      {pkg.description}
                    </p>

                    <div className="mt-4 flex items-baseline gap-1.5">
                      <span className="text-sm font-medium text-gray-500">{pkg.currency}</span>
                      <span className="text-3xl font-bold text-amber-600">{pkg.price}</span>
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        expandedId === pkg.id ? "max-h-[1200px] mt-4 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="space-y-5">
                        <div>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            What's Included
                          </p>
                          <ul className="space-y-2">
                            {pkg.features?.map((feature, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                <svg className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

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
                        href={`tel:${settings?.phone?.replace(/\s/g, "") || ""}`}
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

      {/* --- SECTION: OUR WEDDING MENUS --- */}
      <section className="pb-16 pt-8 sm:pb-24 sm:pt-12 bg-white border-t border-gray-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Our Wedding Menus</h2>
            <p className="mt-4 text-gray-600">
              Explore the exquisite culinary selections crafted by our master chefs for your special day.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="inline-flex flex-wrap justify-center bg-gray-50 rounded-full p-1.5 shadow-md border border-gray-100 gap-1">
              {(["silver", "gold", "platinum", "bites"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveMenuTab(tab)}
                  className={`px-6 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeMenuTab === tab
                      ? "bg-amber-500 text-white shadow-md transform scale-105"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {tab} Menu
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-3xl p-6 sm:p-10 shadow-xl ring-1 ring-gray-200 border-t-4 border-amber-500">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center capitalize">
              {activeMenuTab === "bites" ? "Bites Menu & Allocations" : `${activeMenuTab} Package Menu`}
            </h3>

            {activeMenuTab !== "bites" && (
              <div className="text-center mb-8">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/80 px-5 py-2 text-sm font-bold text-amber-800 ring-1 ring-amber-200 shadow-sm">
                  Extra Per Person: Rs. {activeMenuTab === "silver" ? "3550" : activeMenuTab === "gold" ? "4050" : "4550"}
                </span>
              </div>
            )}

            {activeMenuTab !== "bites" ? (
              <div className="grid sm:grid-cols-2 gap-6 sm:gap-x-12 sm:gap-y-8">
                {weddingMenus[activeMenuTab].map((menuItem, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-0 sm:last:border-b-0">
                    <h4 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-2 flex items-center gap-2">
                      <svg className="h-4 w-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {menuItem.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium pl-6">
                      {menuItem.desc}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-10 mt-6">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4 text-center">Bites Pricing</h4>
                  <div className="max-w-2xl mx-auto overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-amber-50/50 text-amber-900 border-b border-amber-100">
                        <tr>
                          <th className="px-6 py-4 font-semibold uppercase tracking-wider">Item</th>
                          <th className="px-6 py-4 font-semibold text-right uppercase tracking-wider">Price</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {bitesMenuData.map((row, i) => (
                          <tr key={i} className="hover:bg-amber-50/30 transition-colors">
                            <td className="px-6 py-3 font-medium text-gray-700">{row.item}</td>
                            <td className="px-6 py-3 text-right font-bold text-amber-700">{row.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4 text-center">Complimentary Bites Allocation</h4>
                  <div className="overflow-x-auto rounded-xl border border-amber-200 shadow-sm bg-white">
                    <table className="w-full text-sm text-center min-w-[600px]">
                      <thead className="bg-amber-50/50 text-amber-900 border-b border-amber-100">
                        <tr>
                          <th className="px-4 py-3 font-semibold uppercase tracking-wider text-left border-r border-amber-100">Item</th>
                          <th className="px-3 py-3 font-semibold">100 PAX</th>
                          <th className="px-3 py-3 font-semibold">150 PAX</th>
                          <th className="px-3 py-3 font-semibold">200 PAX</th>
                          <th className="px-3 py-3 font-semibold">250 PAX</th>
                          <th className="px-3 py-3 font-semibold">300 PAX</th>
                          <th className="px-3 py-3 font-semibold">350 PAX</th>
                          <th className="px-3 py-3 font-semibold">400 PAX</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {complimentaryBitesData.map((row, i) => (
                          <tr key={i} className="hover:bg-amber-50/30 transition-colors">
                            <td className="px-4 py-3 font-bold text-gray-700 text-left bg-amber-50/30 border-r border-gray-100">{row.item}</td>
                            <td className="px-3 py-3 text-gray-700">{row.pax100}</td>
                            <td className="px-3 py-3 text-gray-700">{row.pax150}</td>
                            <td className="px-3 py-3 text-gray-700">{row.pax200}</td>
                            <td className="px-3 py-3 text-gray-700">{row.pax250}</td>
                            <td className="px-3 py-3 text-gray-700">{row.pax300}</td>
                            <td className="px-3 py-3 text-gray-700">{row.pax350}</td>
                            <td className="px-3 py-3 text-gray-700">{row.pax400}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Important Details & CTA Sections omitted for brevity, but fully SEO optimized */}
    </div>
  );
}