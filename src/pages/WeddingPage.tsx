import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadSettings, defaultSettings, type SiteSettings } from "../data/defaultData";

const heroImages = [
  "https://images.pexels.com/photos/256737/pexels-photo-256737.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1600",
  "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1600",
  "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1600",
  "https://images.pexels.com/photos/16935999/pexels-photo-16935999.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1600"
];

export default function WeddingPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchSettings = async () => {
      try {
        const fetchedSettings = await loadSettings();
        if (fetchedSettings) setSettings(fetchedSettings);
      } catch (error) {
        console.error("Error loading settings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-200 border-t-amber-600"></div>
      </div>
    );
  }

  const features = [
    {
      title: "Stunning Venue Selection",
      description: "Choose from our selection of elegantly designed wedding venues, each with its unique charm. Whether you dream of an intimate garden ceremony, a grand ballroom reception, or a romantic beachfront setting, we have the perfect space to match your vision.",
      image: "https://ik.imagekit.io/Tharusha/high_resolution/high_resolution/_DJM1611-HDR.jpg"
    },
    {
      title: "World-Class Catering",
      description: "Indulge your guests with a culinary experience they won't forget. Our culinary team, led by talented chefs, crafts delectable menus that cater to a variety of tastes and dietary preferences. Whether you desire a gourmet plated dinner, a buffet of international flavors, or a customized menu, we promise a feast that delights the senses.",
      image: "https://ik.imagekit.io/Tharusha/high_resolution/high_resolution/_JD_0512.jpg"
    },
    {
      title: "Professional Staff and Service",
      description: "Our dedicated staff is committed to ensuring that every aspect of your wedding day runs seamlessly. From the moment you step through our doors to the last dance, our team is at your service, attending to your needs and those of your guests with warmth and professionalism.",
      image: "https://ik.imagekit.io/Tharusha/Professional-Hospitality-Uniforms-Impact-Guest-Experience.webp"
    },
    {
      title: "Customized Decor and Styling",
      description: "We believe that your wedding should reflect your personal style and taste. Our expert event planners and decorators work closely with you to bring your vision to life. From floral arrangements to table settings and lighting, every detail is meticulously curated to create a one-of-a-kind atmosphere.",
      image: "https://ik.imagekit.io/Tharusha/high_resolution/high_resolution/_DJM1546-HDR.jpg"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header with Sliding Images */}
      <section className="relative py-24 sm:py-32 overflow-hidden h-[80vh] flex items-center justify-center bg-black">
        <div className="absolute inset-0">
          {heroImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Wedding Slide ${index + 1}`}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
              style={{ transition: "opacity 1.5s ease-in-out, transform 5s ease-in-out" }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300 mb-4 animate-fade-in-up">
            {settings?.businessName || "Royal Chance Palace"}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white drop-shadow-2xl">
            Your Dream <span className="text-amber-500">Wedding</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-gray-200 leading-relaxed font-light drop-shadow-md">
            Begin your journey of a lifetime in an atmosphere of pure elegance and timeless luxury.
          </p>
          <div className="mt-10">
            <a
              href={`tel:${settings?.phone?.replace(/\s/g, "") || ""}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-2xl transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]"
            >
              Inquire Now
            </a>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "w-8 bg-amber-500" : "w-2.5 bg-white/50 hover:bg-white"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            A Masterpiece of a Celebration
          </h2>
          <div className="h-1 w-24 bg-amber-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-lg text-gray-600 leading-relaxed">
            At <strong>{settings?.businessName}</strong>, we believe your wedding day should be nothing short of perfection. Whether you are planning a grand traditional Sri Lankan wedding, a glamorous Western celebration, or an intimate gathering, our magnificent venues and world-class hospitality provide the perfect canvas for your love story.
          </p>
        </div>
      </section>

      {/* Image & Text Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg ring-1 ring-gray-100 hover:-translate-y-2 transition-transform duration-300">
                <div className="h-48 overflow-hidden">
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                </div>
                <div className="p-6 text-center flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: TERMS & COMPLIMENTARY */}
      <section className="py-16 sm:py-24 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Important Details</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our complimentary features and booking policies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Column 1: Additional Information */}
            <div className="bg-gray-50 rounded-3xl p-8 shadow-sm ring-1 ring-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                Terms & Conditions
              </h3>
              <ul className="space-y-5 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-amber-500 shrink-0"></div>
                  Advance Payment: Rs. 50,000.00 (Non-Refundable).
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-amber-500 shrink-0"></div>
                  Full Payment: 14 days prior to the function.
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-amber-500 shrink-0"></div>
                  Menu has to be finalised 14 days prior to the function.
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-amber-500 shrink-0"></div>
                  Time Allocated: Lunch 8.00AM - 4.00PM | Dinner 6.00PM - 12.00AM.
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-amber-500 shrink-0"></div>
                  Buffet Time: Lunch 12.30PM - 3.00PM | Dinner 8.30PM - 11.00PM.
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-amber-500 shrink-0"></div>
                  Menu can be adjusted as per your requirement.
                </li>
                <li className="flex items-start gap-3 text-red-600 font-medium bg-red-50 p-2.5 rounded-lg">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-red-600 shrink-0"></div>
                  No cooked bites are allowed to be bought from outside.
                </li>
                <li className="flex items-start gap-3 text-red-600 font-medium bg-red-50 p-2.5 rounded-lg">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-red-600 shrink-0"></div>
                  Fire crackers are not allowed in the premises due to security concerns.
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-amber-500 shrink-0"></div>
                  Pencil booking is only valid for 5 days.
                </li>
              </ul>
            </div>

            {/* Column 2: Complimentary Features */}
            <div className="bg-gray-50 rounded-3xl p-8 shadow-sm ring-1 ring-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v.75a2.25 2.25 0 01-2.25 2.25H5.25a2.25 2.25 0 01-2.25-2.25v-.75m19.5 0V7.5a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 003 7.5v4.5m19.5 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9" />
                </svg>
                Complimentary Items
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                {[
                  "Air-Conditioned Banquet hall",
                  "Modern attractive multi-colour lighting system",
                  "Standard Floral Decorations (Setteback / Oil Lamp / Poruwa / Table Decoration / Entrance Deco / Head Table Deco)",
                  "Digital display at the entrance",
                  "Pen Kediya / Cake trays / Head table",
                  "Modern-Tiffany Chairs (Gold Colour)",
                  "Decorated Cake knife / Decorated candle",
                  "Ample car parking with Security",
                  "Air-conditioned dressing room and changing room",
                  "Bottle cooler & Standby generator",
                  "Bar Service",
                  "Outdoor photo location at Chance Palace, Veyangoda",
                  "Dancing Floor & Band Stand",
                  "Dedicated banquet Coordinator",
                  "Ashtaka with Essentials",
                  "Kandyan Dancing Group (6 Crew) / Indian Doll (3 Crew)",
                  "Jayamangala / Piligenima (2 crew)",
                  "Kirikala / Champagne Fountain",
                  "Cake Structure / Shashrika table",
                  "DJ / Music Band",
                  "Soft Drinks - Unlimited (Sprite / Coke / Soda)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 border-b border-gray-200 pb-2">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Image Gallery Teaser */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Wedding Decor" className="rounded-2xl shadow-md w-full h-48 object-cover" />
              <img src="https://images.pexels.com/photos/16935999/pexels-photo-16935999.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Banquet setup" className="rounded-2xl shadow-md w-full h-48 object-cover mt-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Designed for Perfection</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Explore our versatile packages tailored to meet your every need. From elegant table settings to customized lighting and premium menus, we have everything to make your vision come alive.
              </p>
              <div className="flex gap-4">
                <Link to="/packages" className="px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-colors shadow-lg">
                  View Packages
                </Link>
                <Link to="/gallery" className="px-6 py-3 rounded-full border-2 border-amber-500 text-amber-600 font-semibold hover:bg-amber-500 hover:text-white transition-colors">
                  View Gallery
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- UPGRADED LUXURY CTA --- */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-black">
        {/* Background Image with Cinematic Overlay */}
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg"
            alt="Wedding Celebration"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Accent Line */}
          <div className="mb-6 inline-flex items-center justify-center gap-3">
            <span className="h-[2px] w-12 bg-amber-500"></span>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400 drop-shadow-md">Your Perfect Day Awaits</span>
            <span className="h-[2px] w-12 bg-amber-500"></span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg tracking-tight">
            Ready to Say <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-600 italic">"I Do"?</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
            Contact our wedding specialists today to check availability, schedule a venue tour, and start planning the celebration of your dreams.
          </p>
          
          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <a
              href={`tel:${settings?.phone?.replace(/\s/g, "") || ""}`}
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-10 py-4 text-base font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              Call {settings?.phone || "Us"}
            </a>
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-md px-10 py-4 text-base font-bold uppercase tracking-wider text-white transition-all hover:bg-white/20 hover:border-white"
            >
              Send an Inquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}