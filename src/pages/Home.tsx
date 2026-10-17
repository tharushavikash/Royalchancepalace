import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GalleryGrid from "../components/GalleryGrid";
import AboutSection from "../components/AboutSection";
import GoogleReviews from "../components/GoogleReviews";
import { loadSettings, loadGallery, defaultSettings, defaultGalleryImages, type SiteSettings, type GalleryImage } from "../data/defaultData";

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
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
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
  }
];

// Helper to optimize image loading speed
const getOptimizedUrl = (url: string) => {
  if (!url) return "";
  if (url.includes("ik.imagekit.io") && !url.includes("tr=")) return `${url}?tr=w-1200,h-800,q-80,fo-auto`;
  return url;
};

export default function Home() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [gallery, setGallery] = useState<GalleryImage[]>(defaultGalleryImages);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const dynamicHeroImages = [
    settings?.heroImage || "https://ik.imagekit.io/Tharusha/467475986_18071338552715668_5118050733254819873_n.jpg?updatedAt=1791307985522",
    "https://ik.imagekit.io/Tharusha/high_resolution/high_resolution/No%20vehicle.png",
    "https://ik.imagekit.io/Tharusha/high_resolution/high_resolution/_DJM1599-HDR.jpg",
    "https://images.pexels.com/photos/16935999/pexels-photo-16935999.jpeg"
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Royal Chance Palace Banquets | Luxury Banquet Hall & Wedding Venue in Yakkala";

    const fetchData = async () => {
      try {
        const fetchedSettings = await loadSettings();
        const fetchedGallery = await loadGallery();
        if (fetchedSettings) setSettings(fetchedSettings);
        if (fetchedGallery) setGallery(fetchedGallery);
      } catch (error) {
        console.error("Error loading home data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dynamicHeroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [dynamicHeroImages.length]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-200 border-t-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* --- REFINED CINEMATIC HERO SECTION --- */}
      <section className="relative flex min-h-[90vh] sm:min-h-screen items-center justify-center overflow-hidden bg-black">
        
        {/* Background Image Slider with Ken Burns Effect */}
        <div className="absolute inset-0 z-0">
          {dynamicHeroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={getOptimizedUrl(img)}
                alt={`Royal Chance Palace Banquet Hall Slide ${index + 1}`}
                className={`h-full w-full object-cover transition-transform duration-[10000ms] ease-linear ${
                  index === currentSlide ? "scale-110" : "scale-100"
                }`}
                decoding="async"
                {...(index === 0 ? { fetchPriority: "high" } : { loading: "lazy" })}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />
            </div>
          ))}
        </div>
        
        {/* Text Content */}
        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mt-12 sm:mt-0">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-black/40 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
              Welcome to Luxury
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white drop-shadow-2xl tracking-tight mb-6">
            Royal <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-600">Chance</span>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 font-bold">Palace Banquets</span>
          </h1>
          
          <p className="mx-auto max-w-3xl text-lg sm:text-2xl text-gray-200 font-light drop-shadow-lg mb-12">
            {settings?.heroSubtitle || "Creating Unforgettable Memories in Elegance. The finest modern reception hall in Yakkala."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link
              to="/packages"
              className="w-full sm:w-auto rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-10 py-4 text-sm sm:text-base font-bold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_35px_rgba(245,158,11,0.6)]"
            >
              View Packages
            </Link>
            <a
              href={`tel:${settings?.phone?.replace(/\s/g, "") || ""}`}
              className="w-full sm:w-auto rounded-full border border-white/40 bg-white/10 backdrop-blur-md px-10 py-4 text-sm sm:text-base font-bold uppercase tracking-wider text-white transition-all hover:bg-white/20 hover:border-white"
            >
              Contact Us
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-bounce text-white/70 hidden sm:flex">
          <span className="text-xs uppercase tracking-widest mb-2 font-medium">Scroll to explore</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* --- STATISTICS BANNER --- */}
      <section className="bg-black py-12 sm:py-16 border-t border-amber-900/40 relative z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            
            <div className="flex flex-col items-center justify-center pt-4 md:pt-0">
              <span className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-amber-300 to-amber-600 mb-2 drop-shadow-md">
                286+
              </span>
              <span className="text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-widest">Happy Reviews</span>
            </div>
            
            <div className="flex flex-col items-center justify-center pt-4 md:pt-0">
              <span className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-amber-300 to-amber-600 mb-2 drop-shadow-md">
                500+
              </span>
              <span className="text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-widest">Events Hosted</span>
            </div>
            
            <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
              <span className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-amber-300 to-amber-600 mb-2 drop-shadow-md">
                400
              </span>
              <span className="text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-widest">Max Capacity</span>
            </div>
            
            <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
              <span className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-amber-300 to-amber-600 mb-2 drop-shadow-md flex items-center justify-center gap-1">
                4.4
                <svg className="h-6 w-6 sm:h-8 sm:w-8 text-amber-500 fill-amber-500" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </span>
              <span className="text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-widest">Guest Rating</span>
            </div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Our Services & Event Solutions</h2>
            <div className="mt-4 h-1 w-20 bg-amber-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
              We provide a versatile array of event solutions tailored perfectly to your specific requirements.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-white">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Gallery Preview */}
      <section className="py-20 sm:py-28 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Captured Moments & Gallery</h2>
              <div className="mt-4 h-1 w-20 bg-amber-500 rounded-full"></div>
            </div>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-600 hover:text-amber-700"
            >
              View Full Gallery
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </Link>
          </div>
          <GalleryGrid images={gallery.slice(0, 6)} />
        </div>
      </section>

      {/* Google Reviews */}
      <GoogleReviews />

      {/* CTA Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.pexels.com/photos/16935999/pexels-photo-16935999.jpeg"
            alt="Royal Chance Palace Banquet Hall Setup"
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Ready to plan your dream event?
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Contact our expert team today to schedule a venue tour and discuss how we can make your celebration truly unforgettable.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={`tel:${settings?.phone?.replace(/\s/g, "") || ""}`}
              className="rounded-full bg-amber-500 px-8 py-4 text-base font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-amber-600 hover:scale-105"
            >
              Call {settings?.phone || "Us"}
            </a>
            <Link
              to="/contact"
              className="rounded-full border-2 border-white px-8 py-4 text-base font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-black"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}