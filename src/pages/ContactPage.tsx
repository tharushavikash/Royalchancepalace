import { useEffect, useState } from "react";
import { loadSettings } from "../data/defaultData";

export default function ContactPage() {
  const settings = loadSettings();
  const [formStatus, setFormStatus] = useState<"idle" | "sent">("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "Wedding",
    date: "",
    guests: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build a WhatsApp message as a simple "send" mechanism (no backend)
    const text = encodeURIComponent(
      `*New Booking Inquiry - Royal Chance Palace*\n\n` +
        `👤 Name: ${formData.name}\n` +
        `📞 Phone: ${formData.phone}\n` +
        `📧 Email: ${formData.email || "N/A"}\n` +
        `🎉 Event Type: ${formData.eventType}\n` +
        `📅 Preferred Date: ${formData.date || "N/A"}\n` +
        `👥 Guests: ${formData.guests || "N/A"}\n` +
        `💬 Message: ${formData.message || "N/A"}`
    );
    window.open(`https://wa.me/94701063686?text=${text}`, "_blank");
    setFormStatus("sent");
    setTimeout(() => setFormStatus("idle"), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactCards = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
      title: "Phone",
      value: settings.phone,
      link: `tel:${settings.phone.replace(/\s/g, "")}`,
      color: "from-green-500 to-green-600",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.756c0 .621-.504 1.125-1.125 1.125H3.375A1.125 1.125 0 012.25 7.506V6.75" />
        </svg>
      ),
      title: "Email",
      value: settings.email,
      link: `mailto:${settings.email}`,
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
      title: "Address",
      value: `${settings.address}, Sri Lanka`,
      link: "https://maps.google.com/?q=426X+GW+Yakkala,Sri+Lanka",
      color: "from-amber-500 to-amber-600",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Opening Hours",
      value: settings.openingHours,
      link: null,
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/35017879/pexels-photo-35017879.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Get In Touch
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
            Contact Us
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-gray-200">
            Have a question or ready to book? We'd love to hear from you. Reach out and our team
            will get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 sm:py-16 -mt-8 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {contactCards.map((card) => {
              const content = (
                <div className="h-full rounded-2xl bg-white p-6 text-center shadow-lg ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div
                    className={`mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} text-white shadow-lg`}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-gray-900 break-words">{card.value}</p>
                </div>
              );
              return card.link ? (
                <a
                  key={card.title}
                  href={card.link}
                  target={card.link.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              ) : (
                <div key={card.title}>{content}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-12 sm:py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 lg:p-10 shadow-xl ring-1 ring-gray-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Send Us a Message
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Fill in the form below and we'll get back to you shortly.
              </p>

              {formStatus === "sent" && (
                <div className="mt-5 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700 ring-1 ring-green-200">
                  ✅ Thank you! Your inquiry has been opened in WhatsApp. Please send the message to
                  complete your booking request.
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+94 7X XXX XXXX"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Event Type
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                    >
                      <option>Wedding</option>
                      <option>Birthday</option>
                      <option>Corporate Event</option>
                      <option>Engagement</option>
                      <option>Anniversary</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      No. of Guests
                    </label>
                    <input
                      type="number"
                      name="guests"
                      min="1"
                      value={formData.guests}
                      onChange={handleChange}
                      placeholder="e.g. 150"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your event..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-amber-500/30 transition-all hover:from-amber-600 hover:to-amber-700"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                  Send via WhatsApp
                </button>
                <p className="text-center text-xs text-gray-400">
                  Or call us directly at{" "}
                  <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="text-amber-600 font-medium">
                    {settings.phone}
                  </a>
                </p>
              </form>
            </div>

            {/* Map & Info */}
            <div className="space-y-6">
              {/* Map */}
              <div className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-gray-100 h-72 sm:h-96">
                <iframe
                  title="Royal Chance Palace Location"
                  src="https://www.google.com/maps?q=426X%2BGW+Yakkala%2C+Sri+Lanka&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              {/* Quick Info */}
              <div className="rounded-3xl bg-gradient-to-br from-amber-500 to-amber-600 p-6 sm:p-8 text-white shadow-xl">
                <h3 className="text-xl font-bold">Royal Chance Palace Banquets</h3>
                <p className="mt-2 text-sm text-amber-100 leading-relaxed">
                  {settings.aboutText}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
                    🍽️ Dine-in
                  </span>
                  <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
                    🥡 Takeaway
                  </span>
                  <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
                    🛵 Delivery
                  </span>
                </div>
                <div className="mt-5 flex items-center gap-2">
                  <span className="flex text-amber-200">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </span>
                  <span className="text-sm font-medium">
                    {settings.rating} ({settings.reviewCount} reviews)
                  </span>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`tel:${settings.phone.replace(/\s/g, "")}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-amber-700 transition-all hover:bg-amber-50"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    Call Now
                  </a>
                  <a
                    href="https://maps.google.com/?q=426X+GW+Yakkala,Sri+Lanka"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/50 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
