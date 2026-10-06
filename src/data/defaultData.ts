// Default data for Royal Chance Palace Banquets
// This data is stored in localStorage so the admin panel can update it without a database

export interface PackageItem {
  id: string;
  name: string;
  price: string;
  currency: string;
  description: string;
  features: string[];
  image: string;
  popular: boolean;
  category: "wedding" | "birthday" | "corporate" | "other";
  capacity: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
  description: string;
}

export interface SiteSettings {
  heroImage: string;
  logo: string;
  businessName: string;
  tagline: string;
  phone: string;
  address: string;
  email: string;
  website: string;
  openingHours: string;
  rating: string;
  reviewCount: string;
  aboutText: string;
  facebook: string;
  instagram: string;
}

export const DEFAULT_HERO_IMAGE = "https://ik.imagekit.io/Tharusha/unnamed.png";
export const DEFAULT_LOGO = "https://ik.imagekit.io/Tharusha/449786402_1240430587231689_7007042046674150158_n.jpg";

export const defaultSettings: SiteSettings = {
  heroImage: DEFAULT_HERO_IMAGE,
  logo: DEFAULT_LOGO,
  businessName: "Royal Chance Palace Banquets",
  tagline: "Where Elegance Meets Celebration",
  phone: "+94 70 106 3686",
  address: "Horagolla Rd, Yakkala, Sri Lanka",
  email: "info@chance.lk",
  website: "chance.lk",
  openingHours: "Opens 8:00 AM · 7 Days a Week",
  rating: "4.4",
  reviewCount: "286",
  aboutText:
    "Celebrate your dream wedding at Royal Chance Palace Banquet Hall, where Elegance, exceptional service, and delicious cuisine come together to create unforgettable memories. Our dedicated team ensures every detail is perfectly arranged, while our carefully prepared menus delight your guests with outstanding taste and quality. From warm hospitality to elegant surroundings, Royal Chance makes every wedding truly special.",
  facebook: "https://facebook.com/royalchancepalace",
  instagram: "https://instagram.com/royalchancepalace",
};

export const defaultPackages: PackageItem[] = [
  {
    id: "wedding-silver",
    name: "Silver Wedding Package",
    price: "350,000",
    currency: "LKR",
    description:
      "An elegant and affordable wedding experience perfect for intimate celebrations with your closest family and friends.",
    features: [
      "Banquet hall decoration with fresh flowers",
      "Buffet dinner for up to 100 guests",
      "Welcome drink & soft beverages",
      "Wedding cake (2 tiers)",
      "Basic sound system & lighting",
      "Free parking for guests",
      "Dedicated event coordinator",
    ],
    image:
      "https://images.pexels.com/photos/30215011/pexels-photo-30215011.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    popular: false,
    category: "wedding",
    capacity: "Up to 100 guests",
  },
  {
    id: "wedding-gold",
    name: "Gold Wedding Package",
    price: "650,000",
    currency: "LKR",
    description:
      "Our most popular wedding package — a complete luxury experience with premium decor, gourmet cuisine, and full-service care.",
    features: [
      "Premium banquet hall decoration with floral arrangements",
      "Gourmet buffet dinner for up to 200 guests",
      "Live BBQ & salad bar station",
      "Welcome drinks, soft beverages & mocktails",
      "Wedding cake (3 tiers) + dessert table",
      "Professional sound system, DJ & stage lighting",
      "Bridal room with decoration",
      "Free parking for all guests",
      "Dedicated event coordinator & staff",
      "Complimentary honeymoon night decoration",
    ],
    image:
      "https://images.pexels.com/photos/17931466/pexels-photo-17931466.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    popular: true,
    category: "wedding",
    capacity: "Up to 200 guests",
  },
  {
    id: "wedding-platinum",
    name: "Platinum Royal Package",
    price: "1,200,000",
    currency: "LKR",
    description:
      "The ultimate royal treatment. Every detail crafted to perfection for your grand dream wedding at Royal Chance Palace.",
    features: [
      "Lavish royal-themed hall decoration with chandeliers",
      "Premium gourmet buffet for up to 350 guests",
      "Live cooking stations & seafood bar",
      "Premium beverages & signature cocktails",
      "Luxury wedding cake (4 tiers) + full dessert & sweet table",
      "Professional DJ, live band setup, LED dance floor",
      "Luxury bridal suite with full decoration",
      "Red carpet entrance & valet parking",
      "Professional photography & videography (basic)",
      "Dedicated royal event management team",
      "Honeymoon suite decoration",
      "Fireworks / sparkler entrance display",
    ],
    image:
      "https://images.pexels.com/photos/16985204/pexels-photo-16985204.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    popular: false,
    category: "wedding",
    capacity: "Up to 350 guests",
  },
  {
    id: "birthday-kids",
    name: "Kids Birthday Bash",
    price: "45,000",
    currency: "LKR",
    description:
      "A magical birthday celebration designed for children, filled with fun decorations, games, and delicious food.",
    features: [
      "Colorful themed hall decoration (balloons & banners)",
      "Kids' buffet menu (nuggets, fries, pasta, jelly)",
      "Birthday cake (1 tier, themed)",
      "Juice & soft drink station",
      "Party games & entertainment",
      "Goodie bags for all kids",
      "Free parking",
    ],
    image:
      "https://images.pexels.com/photos/34260120/pexels-photo-34260120.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    popular: false,
    category: "birthday",
    capacity: "Up to 50 guests",
  },
  {
    id: "birthday-adult",
    name: "Adult Birthday Celebration",
    price: "85,000",
    currency: "LKR",
    description:
      "Celebrate your special day in style with elegant decor, a delicious buffet, and a memorable atmosphere.",
    features: [
      "Elegant hall decoration with balloons & lights",
      "Full buffet dinner for guests",
      "Birthday cake (2 tiers)",
      "Welcome drinks & beverages",
      "Sound system with music",
      "Photo booth corner",
      "Free parking",
    ],
    image:
      "https://images.pexels.com/photos/7600420/pexels-photo-7600420.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    popular: true,
    category: "birthday",
    capacity: "Up to 80 guests",
  },
  {
    id: "corporate-event",
    name: "Corporate Event Package",
    price: "120,000",
    currency: "LKR",
    description:
      "A professional venue for your corporate gatherings, conferences, product launches, and annual celebrations.",
    features: [
      "Professional hall setup with stage",
      "Projector & screen / LED display",
      "Sound system with microphones",
      "Coffee break & lunch buffet",
      "Branded backdrop (on request)",
      "Wi-Fi for all guests",
      "Free parking",
    ],
    image:
      "https://images.pexels.com/photos/16985184/pexels-photo-16985184.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    popular: false,
    category: "corporate",
    capacity: "Up to 150 guests",
  },
  {
    id: "engagement-ceremony",
    name: "Engagement Ceremony Package",
    price: "175,000",
    currency: "LKR",
    description:
      "A beautiful and intimate setting to celebrate your engagement with family, elegance, and great food.",
    features: [
      "Romantic hall decoration with flowers",
      "Buffet dinner for guests",
      "Engagement cake",
      "Welcome drinks & beverages",
      "Sound system & lighting",
      "Flower bouquet for the couple",
      "Free parking",
    ],
    image:
      "https://images.pexels.com/photos/29040997/pexels-photo-29040997.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    popular: false,
    category: "other",
    capacity: "Up to 120 guests",
  },
  {
    id: "anniversary-special",
    name: "Anniversary Special",
    price: "95,000",
    currency: "LKR",
    description:
      "Celebrate years of love and togetherness with an intimate, beautifully arranged anniversary dinner.",
    features: [
      "Romantic candlelight table setup",
      "Special anniversary dinner menu",
      "Anniversary cake",
      "Flower decoration & petals",
      "Soft background music",
      "Free parking",
    ],
    image:
      "https://images.pexels.com/photos/17023148/pexels-photo-17023148.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    popular: false,
    category: "other",
    capacity: "Up to 60 guests",
  },
];

export const defaultGalleryImages: GalleryImage[] = [
  {
    id: "g1",
    url: "https://images.pexels.com/photos/30215011/pexels-photo-30215011.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Elegant Wedding Reception",
    category: "Weddings",
    description: "Luxurious wedding reception setup featuring floral centerpieces and elegant decor.",
  },
  {
    id: "g2",
    url: "https://images.pexels.com/photos/16935999/pexels-photo-16935999.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Grand Banquet Setting",
    category: "Venue",
    description: "Luxurious indoor banquet setting with vibrant floral arrangements.",
  },
  {
    id: "g3",
    url: "https://images.pexels.com/photos/17931466/pexels-photo-17931466.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Royal Hall Interior",
    category: "Venue",
    description: "Luxurious indoor wedding venue featuring a floral-adorned grand staircase.",
  },
  {
    id: "g4",
    url: "https://images.pexels.com/photos/17023018/pexels-photo-17023018.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Floral Wonderland",
    category: "Decor",
    description: "Wedding venue adorned with exquisite floral arrangements and elegant lighting.",
  },
  {
    id: "g5",
    url: "https://images.pexels.com/photos/15621210/pexels-photo-15621210.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Formal Event Setup",
    category: "Venue",
    description: "Luxurious banquet hall prepared for a formal event.",
  },
  {
    id: "g6",
    url: "https://images.pexels.com/photos/17023021/pexels-photo-17023021.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Blossom Celebration",
    category: "Decor",
    description: "Indoor wedding setup with pink blossoms and elegant table arrangement.",
  },
  {
    id: "g7",
    url: "https://images.pexels.com/photos/35985205/pexels-photo-35985205.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Candlelit Reception",
    category: "Weddings",
    description: "Wedding reception setup featuring elegant floral arrangements and candlelit tables.",
  },
  {
    id: "g8",
    url: "https://images.pexels.com/photos/17057004/pexels-photo-17057004.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Modern Event Space",
    category: "Venue",
    description: "Spacious interior featuring modern decor and a large screen for events.",
  },
  {
    id: "g9",
    url: "https://images.pexels.com/photos/35017879/pexels-photo-35017879.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Lavish Banquet Hall",
    category: "Venue",
    description: "Luxurious banquet hall set for a grand event with elegant decor.",
  },
  {
    id: "g10",
    url: "https://images.pexels.com/photos/4717550/pexels-photo-4717550.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Joyful Celebration",
    category: "Weddings",
    description: "A grand indoor wedding reception with ornate lighting and a vibrant atmosphere.",
  },
  {
    id: "g11",
    url: "https://images.pexels.com/photos/29040997/pexels-photo-29040997.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Reception Table Decor",
    category: "Decor",
    description: "Beautifully arranged tables with elegant decor at an indoor wedding reception.",
  },
  {
    id: "g12",
    url: "https://images.pexels.com/photos/17023148/pexels-photo-17023148.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Candle & Flower Table",
    category: "Decor",
    description: "A beautifully decorated wedding table featuring candles and floral arrangements.",
  },
  {
    id: "g13",
    url: "https://images.pexels.com/photos/19869790/pexels-photo-19869790.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Dessert Table Magic",
    category: "Food & Drink",
    description: "Stylish dessert table setup with cakes, candles, and floral arrangements.",
  },
  {
    id: "g14",
    url: "https://images.pexels.com/photos/17294714/pexels-photo-17294714.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Gourmet Banquet Table",
    category: "Food & Drink",
    description: "Beautifully decorated banquet table with flowers and assorted gourmet dishes.",
  },
  {
    id: "g15",
    url: "https://images.pexels.com/photos/18980077/pexels-photo-18980077.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Wedding Buffet",
    category: "Food & Drink",
    description: "A beautiful wedding reception buffet featuring desserts and floral arrangements.",
  },
  {
    id: "g16",
    url: "https://images.pexels.com/photos/33553123/pexels-photo-33553123.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Appetizer Elegance",
    category: "Food & Drink",
    description: "Top view of a dining table set with elegant appetizers and salads.",
  },
  {
    id: "g17",
    url: "https://images.pexels.com/photos/37976953/pexels-photo-37976953.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Floral Buffet Display",
    category: "Food & Drink",
    description: "Wedding buffet setup with vibrant floral decor and diverse dishes.",
  },
  {
    id: "g18",
    url: "https://images.pexels.com/photos/4717555/pexels-photo-4717555.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Gold Accent Dining",
    category: "Decor",
    description: "Elegant table arrangement with gold accents and floral centerpiece.",
  },
  {
    id: "g19",
    url: "https://images.pexels.com/photos/28815667/pexels-photo-28815667.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Wedding Couple Celebration",
    category: "Weddings",
    description: "Happy bride and groom walking arm-in-arm at their wedding reception.",
  },
  {
    id: "g20",
    url: "https://images.pexels.com/photos/29237413/pexels-photo-29237413.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Romantic Kiss Under Lights",
    category: "Weddings",
    description: "A bride and groom share a kiss with guests applauding under string lights.",
  },
  {
    id: "g21",
    url: "https://images.pexels.com/photos/30279928/pexels-photo-30279928.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Garden Dance",
    category: "Weddings",
    description: "A couple in wedding attire dances joyfully in a sunlit garden setting.",
  },
  {
    id: "g22",
    url: "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Tender Veil Kiss",
    category: "Weddings",
    description: "Bride and groom share a tender kiss under a veil.",
  },
  {
    id: "g23",
    url: "https://images.pexels.com/photos/12031113/pexels-photo-12031113.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "First Dance",
    category: "Weddings",
    description: "A bride and groom dance elegantly at their reception venue.",
  },
  {
    id: "g24",
    url: "https://images.pexels.com/photos/7600420/pexels-photo-7600420.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Birthday Candle Wish",
    category: "Birthdays",
    description: "Bright birthday setup featuring a cake with candles and balloons.",
  },
  {
    id: "g25",
    url: "https://images.pexels.com/photos/34260120/pexels-photo-34260120.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "First Birthday Party",
    category: "Birthdays",
    description: "Charming first birthday party setup with balloons and decorative sign.",
  },
  {
    id: "g26",
    url: "https://images.pexels.com/photos/7180598/pexels-photo-7180598.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Birthday Preparation",
    category: "Birthdays",
    description: "Arranging a birthday cake on a table with balloons and decorations.",
  },
  {
    id: "g27",
    url: "https://images.pexels.com/photos/16220888/pexels-photo-16220888.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Birthday Dessert Table",
    category: "Birthdays",
    description: "Colorful birthday dessert table with balloons and cake in festive setting.",
  },
  {
    id: "g28",
    url: "https://images.pexels.com/photos/16985184/pexels-photo-16985184.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Conference Setup",
    category: "Corporate",
    description: "Spacious and modern event hall with projection screen setup for conferences.",
  },
  {
    id: "g29",
    url: "https://images.pexels.com/photos/16985131/pexels-photo-16985131.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Modern Event Hall",
    category: "Corporate",
    description: "Spacious, modern event hall with plants, tables, and decorative lighting.",
  },
  {
    id: "g30",
    url: "https://images.pexels.com/photos/16985204/pexels-photo-16985204.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Crystal Chandelier Hall",
    category: "Venue",
    description: "Elegant crystal chandelier illuminating a luxurious banquet hall.",
  },
  {
    id: "g31",
    url: "https://images.pexels.com/photos/27466748/pexels-photo-27466748.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Royal Gold Interior",
    category: "Venue",
    description: "Opulent palace interior featuring a grand crystal chandelier with gold decor.",
  },
  {
    id: "g32",
    url: "https://images.pexels.com/photos/14457536/pexels-photo-14457536.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Wedding Dessert Display",
    category: "Food & Drink",
    description: "A sophisticated dessert display featuring a macaron tower and tiered wedding cake.",
  },
  {
    id: "g33",
    url: "https://images.pexels.com/photos/14457533/pexels-photo-14457533.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Grand Dessert Table",
    category: "Food & Drink",
    description: "A beautifully decorated wedding dessert table with a grand floral cake.",
  },
  {
    id: "g34",
    url: "https://images.pexels.com/photos/15207834/pexels-photo-15207834.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Cake & Cupcake Display",
    category: "Food & Drink",
    description: "Elegant cake and cupcake display garnished with fruits and roses.",
  },
  {
    id: "g35",
    url: "https://images.pexels.com/photos/11745423/pexels-photo-11745423.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Lavish Dessert Spread",
    category: "Food & Drink",
    description: "A lavish dessert table with various pastries and cakes at a festive event.",
  },
  {
    id: "g36",
    url: "https://images.pexels.com/photos/32689479/pexels-photo-32689479.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Luxury Buffet Spread",
    category: "Food & Drink",
    description: "A sumptuous buffet with assorted meats and rice served in a luxurious setting.",
  },
];

// localStorage keys
const STORAGE_KEYS = {
  settings: "rcp_settings",
  packages: "rcp_packages",
  gallery: "rcp_gallery",
  adminAuth: "rcp_admin_auth",
};

export const ADMIN_PASSWORD = "royalchance2026";

// Load data from localStorage or return defaults
export function loadSettings(): SiteSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.settings);
    if (stored) return { ...defaultSettings, ...JSON.parse(stored) };
  } catch {
    // ignore
  }
  return defaultSettings;
}

export function saveSettings(settings: SiteSettings): void {
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
}

export function loadPackages(): PackageItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.packages);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return defaultPackages;
}

export function savePackages(packages: PackageItem[]): void {
  localStorage.setItem(STORAGE_KEYS.packages, JSON.stringify(packages));
}

export function loadGallery(): GalleryImage[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.gallery);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return defaultGalleryImages;
}

export function saveGallery(images: GalleryImage[]): void {
  localStorage.setItem(STORAGE_KEYS.gallery, JSON.stringify(images));
}

export function checkAdminAuth(): boolean {
  return localStorage.getItem(STORAGE_KEYS.adminAuth) === "true";
}

export function setAdminAuth(value: boolean): void {
  if (value) {
    localStorage.setItem(STORAGE_KEYS.adminAuth, "true");
  } else {
    localStorage.removeItem(STORAGE_KEYS.adminAuth);
  }
}

export function resetAllData(): void {
  localStorage.removeItem(STORAGE_KEYS.settings);
  localStorage.removeItem(STORAGE_KEYS.packages);
  localStorage.removeItem(STORAGE_KEYS.gallery);
}
