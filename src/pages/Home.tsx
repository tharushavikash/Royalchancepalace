import { useEffect } from "react";
import { Link } from "react-router-dom";
import GalleryGrid from "../components/GalleryGrid";
import { loadSettings, loadPackages, loadGallery } from "../data/defaultData";

const services = [
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: "Wedding Receptions",
    description: "Elegant venues and flawless service for your dream wedding day.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v.75a2.25 2.25 0 01-2.25 2.25H5.25a2.25 2.25 0 01-2.25-2.25v-.75m19.5 0V7.5a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 003 7.5v4.5m19.5 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9" />
      </svg>
    ),
    title: "Birthday Parties",
    description: "Memorable celebrations filled with joy, fun, and delicious food.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    ),
    title: "Corporate Events",
    description: "Professional settings for conferences, launches, and meetings.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.379a48.241 48.241 0 00-6-.371m12 0c-.39.026-.777.05-1.162.074M12 3c2.071 0 3.75 1.679 3.75 3.75 0 2.071-1.679 3.75-3.75 3.75S8.25 8.071 8.25 6 9.929 3 12 3z" />
      </svg>
    ),
    title: "Catering & Cuisine",
    description: "Exquisite Sri Lankan and international cuisine by expert chefs.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: "Engagement & Anniversary",
    description: "Intimate, beautifully arranged celebrations for your milestones.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: "Dine-in · Takeaway · Delivery",
    description: "Enjoy our delicious food your way — dine in, take away, or get it delivered.",
  },
];

const stats = [
  { value: "286+", label: "Happy Reviews" },
  { value: "500+", label: "Events Hosted" },
  { value: "350", label: "Max Capacity" },
  { value: "4.4", label: "Guest Rating" },
];

export default function Home() {
  const settings = loadSettings();
  const packages = loadPackages();
  const gallery = loadGallery();

  const featuredPackages = packages.filter((p) => p.popular).slice(0, 3);
  const displayPackages = featuredPackages.length >= 3 ? featuredPackages : packages.slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={settings.heroImage}
            alt={settings.businessName}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-24 left-8 h-32 w-32 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute bottom-32 right-8 h-40 w-40 rounded-full bg-amber-400/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center pt-20 pb-16">
          {/* Rating Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md ring-1 ring-white/20">
            <span className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </span>
            <span className="text-sm font-medium text-white">
              {settings.rating} · {settings.reviewCount} reviews
            </span>
          </div>

          <p className="mb-4 text-sm sm:text-base font-medium uppercase tracking-[0.3em] text-amber-300">
            {settings.tagline}
          </p>

          <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white drop-shadow-lg">
            Royal Chance
            <span className="block mt-1 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent">
              Palace Banquets
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-base sm:text-lg text-gray-200 leading-relaxed px-4">
            Celebrate your dream wedding and special moments where elegance, exceptional
            service, and delicious cuisine come together to create unforgettable memories.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/packages"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-amber-500/30 transition-all hover:from-amber-600 hover:to-amber-700 hover:shadow-2xl hover:-translate-y-0.5"
            >
              View Packages
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <a
              href={`tel:${settings.phone.replace(/\s/g, "")}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/60 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-white hover:text-amber-700"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              Call Now
            </a>
          </div>

          {/* Info Chips */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
            {[
              { icon: "📍", text: settings.address },
              { icon: "🕗", text: settings.openingHours },
              { icon: "🍽️", text: "Dine-in · Takeaway · Delivery" },
            ].map((chip, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur-md ring-1 ring-white/15"
              >
                <span>{chip.icon}</span>
                <span className="max-w-[220px] sm:max-w-none truncate">{chip.text}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="h-6 w-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-xs sm:text-sm font-medium uppercase tracking-wider text-amber-100">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Images */}
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={gallery[0]?.url}
                  alt="Royal Chance Palace"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 sm:-right-8 w-40 sm:w-56 aspect-[4/3] overflow-hidden rounded-3xl border-8 border-white shadow-2xl hidden sm:block">
                <img
                  src={gallery[2]?.url}
                  alt="Hall interior"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -top-6 -left-4 sm:-left-8 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 px-5 py-4 text-white shadow-xl">
                <p className="text-2xl sm:text-3xl font-bold">15+</p>
                <p className="text-xs sm:text-sm text-amber-100">Years of Excellence</p>
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">
                About Us
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
                Welcome to {settings.businessName}
              </h2>
              <p className="mt-5 text-gray-600 leading-relaxed">{settings.aboutText}</p>

              <ul className="mt-7 space-y-3">
                {[
                  "Elegant, customizable banquet halls",
                  "Expert chefs & exquisite cuisine",
                  "Dedicated event coordination team",
                  "Premium decoration & ambiance",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-gray-800"
                >
                  Book Your Event
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link
                  to="/gallery"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-amber-500 px-7 py-3 text-sm font-semibold text-amber-600 transition-all hover:bg-amber-50"
                >
                  View Gallery
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-amber-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">
              What We Offer
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
              Our Services
            </h2>
            <p className="mt-4 text-gray-600">
              From intimate gatherings to grand celebrations — we make every occasion unforgettable.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-2xl bg-white p-6 sm:p-8 shadow-md ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-amber-200"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 text-amber-600 transition-colors group-hover:from-amber-500 group-hover:to-amber-600 group-hover:text-white">
                  {service.icon}
                </div>
                <h3 className="mt-5 text-lg font-bold text-gray-900">{service.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">
                Our Packages
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
                Featured Packages
              </h2>
            </div>
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700"
            >
              View All Packages
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                {pkg.popular && (
                  <div className="absolute top-4 right-4 z-10 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
                    Most Popular
                  </div>
                )}
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-amber-600">
                    {pkg.capacity}
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-gray-900">{pkg.name}</h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{pkg.description}</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-900">{pkg.currency}</span>
                    <span className="text-2xl font-bold text-amber-600">{pkg.price}</span>
                  </div>
                  <Link
                    to="/packages"
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-amber-600"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-amber-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">
              Gallery
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
              Moments at Royal Chance
            </h2>
            <p className="mt-4 text-gray-600">
              A glimpse into the beautiful celebrations we've had the honor to host.
            </p>
          </div>
          <div className="mt-12">
            <GalleryGrid images={gallery} limit={8} />
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 rounded-full border-2 border-amber-500 px-8 py-3 text-sm font-semibold text-amber-600 transition-all hover:bg-amber-500 hover:text-white"
            >
              View Full Gallery
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={gallery[1]?.url}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Celebrate at Royal Chance Palace?
          </h2>
          <p className="mt-4 text-gray-200">
            Contact us today to book your date and let us make your special occasion truly
            unforgettable.
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/60 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-white hover:text-amber-700"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
