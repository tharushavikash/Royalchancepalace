import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase"; 

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
  eventsHosted: string;
  maxCapacity: string;
  aboutText: string;
  facebook: string;
  instagram: string;
  priceChart100: string;
  priceChart150: string;
  priceChart200: string;
  priceChart250: string;
  priceChart300: string;
  priceChart350: string;
  priceChart400: string;
  // --- NEW: MENU DATA ---
  menuSilver: string;
  menuGold: string;
  menuPlatinum: string;
  bitesPricing: string;
  complimentaryBites: string;
}

export const DEFAULT_HERO_IMAGE = "https://ik.imagekit.io/Tharusha/467475986_18071338552715668_5118050733254819873_n.jpg";
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
  reviewCount: "286+",
  eventsHosted: "500+",
  maxCapacity: "400",
  aboutText:
    "Celebrate your dream wedding at Royal Chance Palace Banquet Hall, where Elegance, exceptional service, and delicious cuisine come together to create unforgettable memories. Our dedicated team ensures every detail is perfectly arranged, while our carefully prepared menus delight your guests with outstanding taste and quality. From warm hospitality to elegant surroundings, Royal Chance makes every wedding truly special.",
  facebook: "https://facebook.com/royalchancepalace",
  instagram: "https://instagram.com/royalchancepalace",
  
  priceChart100: "655,000.00, 700,000.00, 765,000.00",
  priceChart150: "785,000.00, 855,000.00, 950,000.00",
  priceChart200: "985,000.00, 1,075,000.00, 1,205,000.00",
  priceChart250: "1,195,000.00, 1,305,000.00, 1,470,000.00",
  priceChart300: "1,415,000.00, 1,545,000.00, 1,745,000.00",
  priceChart350: "1,610,000.00, 1,765,000.00, 1,995,000.00",
  priceChart400: "1,830,000.00, 2,010,000.00, 2,270,000.00",

  menuSilver: `Welcome Drink | Orange / Mixed Fruit / Mango
Soup + Baked Bread & Butter (Select 01) | Corn & Egg Drop / Cream of Vegetable / Cream of Mushroom / Cream of Pumpkin
Salads (Select 05) | Mixed vegetable Salad / Coleslaw Salad with Mayonnaise / Russian Salad / Creamy Potato Salad / Egg Onion Salad / Pasta Sausages Salad / Green Salad / Cucumber Curd Salad / Moroccan Beetroot Salad / Mushroom & Chicken Salad. (Vinaigrette & French Dressing Complementary)
Rice (Select 02) | Steamed White Rice / Egg & Vegetable Fried Rice / Tempered Yellow Rice / Vegetable Biriyani
Noodles / Kottu (Select 01) | Mixed Vegetable Noodles / Thai Fried Noodles / Egg & Vegetable Roti Kottu
Chicken (Select 01) | Fried Chicken Curry / Chicken Masala / Paper Fried Chicken / Thai Chicken Red Curry / Chicken Devilled / Chicken Stew
Fish (Select 01) | Fish Ambulthiyal / Sweet & Sour Fish / Fish Devilled / Fish Stew / Chilli Fish
Vegetables (Select 04) | Cashew Curry / Tempered Potato / Dhal Masala / Stir Fried Kankung / Brinjal Moju / Dhal Tempered / Vegetable Chopsuey / Stir Fried Vegetables / Hot Buttered Mushroom
Condiments (All) | Papadam / Malay Pickle / Chilli Paste / Mango Chutney / Fried Red Chillies
Desserts (Select 05) | Vanilla Ice Cream / Jelly Crystals / Watalappan / Fresh Cut Fruits / Marshmallow Pudding / Chocolate Mousse / Orange Mousse / Strawberry Mousse / Hot Bread Pudding / Sago Pudding
Additional | Iced Coffee (Lunch Only)`,

  menuGold: `Welcome Drink | Orange / Mixed Fruit / Mango / Apple / Strawberry Guava / Lime & Mint
Soup + Baked Bread & Butter (Select 01) | Chicken Corn & Egg Drop / Cream of Chicken / Cream of Mushroom / Cream of Pumpkin / Brown Onion
Salads (Select 06) | Coleslaw Salad with Mayonnaise / Russian Salad / Creamy Potato Salad / Egg Onion Salad / Pasta Sausages Salad / Green Salad / Cucumber Tomato & Onion / Cucumber Curd Salad / Moroccan Beetroot Salad / Mushroom & Chicken Salad / Nicoise Salad / Mixed Lettuce with Dressings / Corn & Beans Salad / Spicy Tuna with green Chilli & Coriander Salad. (Vinaigrette, Thousand Island & French Dressing Complementary)
Rice (Select 02) | Steamed White Rice / Chicken Egg & Vegetable Fried Rice / Tempered Yellow Rice / Chicken Biriyani / Cashew & Green Pea Rice
Pasta / Noodles / Kottu (Select 01) | Mixed Vegetable Noodles / Thai Fried Noodles / Mee Goreng / Egg & Vegetable Roti Kottu / Penne Pasta with Cheese Sauce
Chicken (Select 01) | Fried Chicken Curry / Chicken Masala / Paper Fried Chicken / Thai Chicken Red Curry / Chicken Devilled / Chicken Kurma / Chicken Stew
Fish (Select 01) | Fish Ambulthiyal / Sweet & Sour Fish / Fish Devilled / Fish Stew / Chilli Fish / Crumb Fried Fish with Tartar Sauce
Pork (Select 01) | Negombo Style Pork Black Curry / Pork Stew / Pork Pepper Fry / Stir Fried Pork with Kankung Oyster Sauce
Vegetables (Select 04) | Cashew Curry / Tempered Potato / Dhal Masala / Stir Fried Kankung / Brinjal Moju / Dhal Tempered / Vegetable Chopsuey / Stir Fried Vegetables / Hot Buttered Mushroom / Baked Potato with white Sauce / Fried Mushroom & Garlic Sauce
Condiments (All) | Papadam / Malay Pickle / Chilli Paste / Mango Chutney / Fried Red Chillies
Desserts (Select 06) | Vanilla Ice Cream / Jelly Crystals / Watalappan / Fresh Cut Fruits / Marshmallow Pudding / Chocolate Mousse / White Chocolate Mousse / Orange Mousse / Strawberry Mousse / Hot Bread Pudding / Sago Pudding / Pineapple Gateaux
Additional | Iced Coffee (Lunch Only)`,

  menuPlatinum: `Welcome Drink | Orange / Mixed Fruit / Mango / Apple / Strawberry Guava / Lime & Mint / Blue Curacao (Mojito)
Soup + Baked Bread & Butter (Select 01) | Chicken Corn & Egg Drop / Cream of Chicken / Cream of Mushroom / Cream of Pumpkin / Brown Onion / Seafood Chowder
Salads (Select 07) | Coleslaw Salad with Mayonnaise / Russian Salad / Creamy Potato Salad / Egg Onion Salad / Pasta Sausages Salad / Green Salad / Cucumber Tomato & Onion / Cucumber Curd Salad / Moroccan Beetroot Salad / Mushroom & Chicken Salad / Nicoise Salad / Mixed Lettuce with Dressings / Corn & Beans Salad / Spicy Tuna with green Chilli & Coriander Salad / Seafood Salad / Whole Baked Fish. (Vinaigrette, Thousand Island & French Dressing Complementary)
Rice (Select 02) | Steamed White Rice / Mixed Fried Rice / Tempered Yellow Rice / Chicken Biriyani / Cashew & Green Pea Rice / Spice Nasi Goreng with Seafood
Pasta / Noodles / Kottu / Spaghetti (Select 02) | Mixed Vegetable Noodles / Thai Fried Noodles / Mee Goreng / Egg & Vegetable Roti Kottu / Penne Pasta with Cheese Sauce / Spaghetti with Pesto Sauce
Chicken (Select 01) | Fried Chicken Curry / Chicken Masala / Paper Fried Chicken / Thai Chicken Red Curry / Chicken Devilled / Chicken Kurma / Chicken Stew
Fish (Select 01) | Fish Ambulthiyal / Sweet & Sour Fish / Fish Devilled / Fish Stew / Chilli Fish / Crumb Fried Fish with Tartar Sauce
Seafood (Select 01) | Prawns Devilled / Seafood Devilled / Hot Butter Cuttlefish / Prawns Sweet & Sour
Vegetables (Select 05) | Cashew Curry / Tempered Potato / Dhal Masala / Stir Fried Kankung / Brinjal Moju / Dhal Tempered / Vegetable Chopsuey / Stir Fried Vegetables / Hot Buttered Mushroom / Baked Potato with white Sauce / Fried Mushroom & Garlic Sauce
Condiments (All) | Papadam / Malay Pickle / Chilli Paste / Mango Chutney / Fried Red Chillies
Desserts (Select 07) | Vanilla Ice Cream / Jelly Crystals / Watalappan / Fresh Cut Fruits / Marshmallow Pudding / Chocolate Mousse / White Chocolate Mousse / Orange Mousse / Strawberry Mousse / Hot Bread Pudding / Sago Pudding / Pineapple Gateaux / Strawberry Cheese Cake
Additional | Iced Coffee (Lunch Only)`,

  bitesPricing: `Chicken | Rs 2950.00 / Kg
Pork | Rs 3950.00 / Kg
Beef | Rs 4850.00 / Kg
Kadala | Rs 2950.00 / Kg
Cheese Cutlet | Rs 100.00 / Nos
Boiled Vegetable | Rs 1950.00 / Kg
Sausages | Rs 2750.00 / Kg
French Fries | Rs 2750.00 / Kg
Bombay Mixture | Rs 1800.00 / Kg
Chicken Nugget | Rs 3500.00 / Kg
Potato Wedges | Rs 2500.00 / Kg`,

  complimentaryBites: `Chicken | 10 KG | 15 KG | 20 KG | 25 KG | 30 KG | 35 KG | 40 KG
Boiled Vegetables | 7 KG | 10 KG | 13 KG | 16 KG | 19 KG | 22 KG | 25 KG
Kadala | 2 KG | 3 KG | 4 KG | 5 KG | 6 KG | 7 KG | 8 KG
Mixture | 2 KG | 3 KG | 4 KG | 5 KG | 6 KG | 7 KG | 8 KG`
};

export const defaultPackages: PackageItem[] = [
  {
    id: "wedding-islamic",
    name: "Islamic Wedding Package",
    price: "250,000",
    currency: "LKR",
    description: "A complete Hall-Only package designed to provide an elegant, comfortable, and hassle-free venue for your special day.",
    features: [
      "Fully air-conditioned banquet hall (400 pax)",
      "Secure parking space for 120+ vehicles with security",
      "Two A/C changing rooms (can be used as prayer rooms)",
      "Standard floral decorations (Settee back, Table, Entrance)",
      "Modern gold Tiffany chairs & Table linen"
    ],
    image: "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    popular: true,
    category: "wedding",
    capacity: "Up to 400 Guests",
  },
  {
    id: "wedding-silver-2027",
    name: "Silver Wedding Package 2027",
    price: "655,000+",
    currency: "LKR",
    description: "Our elegant Silver package starting at LKR 655,000 for 100 guests (up to LKR 1,830,000 for 400 guests). Perfect for a beautiful and complete wedding celebration.",
    features: [
      "Menu: 1 Soup, 5 Salads, 2 Rice, 1 Noodles/Kottu, Chicken, Fish, 4 Veg & 5 Desserts",
      "Air-Conditioned Banquet hall with modern lighting",
      "Standard Floral Decorations (Poruwa, Setteback, Tables)",
      "Kandyan Dancing Group (6 Crew) & Ashtaka with essentials",
      "DJ / Music Band & Dancing Floor",
      "4 varieties of Bites & Unlimited Soft Drinks",
      "Ample car parking with security & Bar Service"
    ],
    image: "https://images.pexels.com/photos/16935999/pexels-photo-16935999.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    popular: false,
    category: "wedding",
    capacity: "100 - 400 Guests",
  },
  {
    id: "wedding-gold-2027",
    name: "Gold Wedding Package 2027",
    price: "700,000+",
    currency: "LKR",
    description: "Our most popular Gold package starting at LKR 700,000 for 100 guests (up to LKR 2,010,000 for 400 guests). Includes expanded menu options including Pork and additional desserts.",
    features: [
      "Menu: 1 Soup, 6 Salads, 2 Rice, 1 Pasta/Noodles, Chicken, Fish, Pork, 4 Veg & 6 Desserts",
      "Air-Conditioned Banquet hall with modern lighting",
      "Standard Floral Decorations (Poruwa, Setteback, Tables)",
      "Kandyan Dancing Group (6 Crew) & Ashtaka with essentials",
      "DJ / Music Band & Dancing Floor",
      "4 varieties of Bites & Unlimited Soft Drinks",
      "Ample car parking with security & Bar Service"
    ],
    image: "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    popular: true,
    category: "wedding",
    capacity: "100 - 400 Guests",
  },
  {
    id: "wedding-platinum-2027",
    name: "Platinum Royal Package 2027",
    price: "765,000+",
    currency: "LKR",
    description: "The ultimate Platinum package starting at LKR 765,000 for 100 guests (up to LKR 2,270,000 for 400 guests). Offers the widest variety of premium cuisines including Seafood.",
    features: [
      "Menu: 1 Soup, 7 Salads, 2 Rice, 2 Pasta/Noodles, Chicken, Fish, Seafood, 5 Veg & 7 Desserts",
      "Air-Conditioned Banquet hall with modern lighting",
      "Standard Floral Decorations (Poruwa, Setteback, Tables)",
      "Kandyan Dancing Group (6 Crew) & Ashtaka with essentials",
      "DJ / Music Band & Dancing Floor",
      "4 varieties of Bites & Unlimited Soft Drinks",
      "Ample car parking with security & Bar Service"
    ],
    image: "https://images.pexels.com/photos/256737/pexels-photo-256737.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    popular: false,
    category: "wedding",
    capacity: "100 - 400 Guests",
  },
  {
    id: "birthday-kids",
    name: "Kids Birthday Bash",
    price: "45,000",
    currency: "LKR",
    description: "A magical birthday celebration designed for children, filled with fun decorations, games, and delicious food.",
    features: ["Colorful themed hall decoration (balloons & banners)", "Kids' buffet menu (nuggets, fries, pasta, jelly)", "Birthday cake (1 tier, themed)", "Juice & soft drink station", "Party games & entertainment", "Goodie bags for all kids", "Free parking"],
    image: "https://images.pexels.com/photos/34260120/pexels-photo-34260120.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    popular: false,
    category: "birthday",
    capacity: "Up to 50 guests",
  },
  {
    id: "birthday-adult",
    name: "Adult Birthday Celebration",
    price: "85,000",
    currency: "LKR",
    description: "Celebrate your special day in style with elegant decor, a delicious buffet, and a memorable atmosphere.",
    features: ["Elegant hall decoration with balloons & lights", "Full buffet dinner for guests", "Birthday cake (2 tiers)", "Welcome drinks & beverages", "Sound system with music", "Photo booth corner", "Free parking"],
    image: "https://images.pexels.com/photos/7600420/pexels-photo-7600420.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    popular: false,
    category: "birthday",
    capacity: "Up to 80 guests",
  },
  {
    id: "corporate-event",
    name: "Corporate Event Package",
    price: "120,000",
    currency: "LKR",
    description: "A professional venue for your corporate gatherings, conferences, product launches, and annual celebrations.",
    features: ["Professional hall setup with stage", "Projector & screen / LED display", "Sound system with microphones", "Coffee break & lunch buffet", "Branded backdrop (on request)", "Wi-Fi for all guests", "Free parking"],
    image: "https://images.pexels.com/photos/16985184/pexels-photo-16985184.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    popular: false,
    category: "corporate",
    capacity: "Up to 150 guests",
  },
  {
    id: "engagement-ceremony",
    name: "Engagement Ceremony Package",
    price: "175,000",
    currency: "LKR",
    description: "A beautiful and intimate setting to celebrate your engagement with family, elegance, and great food.",
    features: ["Romantic hall decoration with flowers", "Buffet dinner for guests", "Engagement cake", "Welcome drinks & beverages", "Sound system & lighting", "Flower bouquet for the couple", "Free parking"],
    image: "https://images.pexels.com/photos/29040997/pexels-photo-29040997.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    popular: false,
    category: "other",
    capacity: "Up to 120 guests",
  },
  {
    id: "anniversary-special",
    name: "Anniversary Special",
    price: "95,000",
    currency: "LKR",
    description: "Celebrate years of love and togetherness with an intimate, beautifully arranged anniversary dinner.",
    features: ["Romantic candlelight table setup", "Special anniversary dinner menu", "Anniversary cake", "Flower decoration & petals", "Soft background music", "Free parking"],
    image: "https://images.pexels.com/photos/17023148/pexels-photo-17023148.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    popular: false,
    category: "other",
    capacity: "Up to 60 guests",
  }
];

export const defaultGalleryImages: GalleryImage[] = [
  { id: "g1", url: "https://images.pexels.com/photos/30215011/pexels-photo-30215011.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", title: "Elegant Wedding Reception", category: "Weddings", description: "Luxurious wedding reception setup featuring floral centerpieces and elegant decor." },
  { id: "g2", url: "https://images.pexels.com/photos/16935999/pexels-photo-16935999.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", title: "Grand Banquet Setting", category: "Venue", description: "Luxurious indoor banquet setting with vibrant floral arrangements." },
  { id: "g3", url: "https://images.pexels.com/photos/17931466/pexels-photo-17931466.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", title: "Royal Hall Interior", category: "Venue", description: "Luxurious indoor wedding venue featuring a floral-adorned grand staircase." },
  { id: "g4", url: "https://images.pexels.com/photos/17023018/pexels-photo-17023018.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", title: "Floral Wonderland", category: "Decor", description: "Wedding venue adorned with exquisite floral arrangements and elegant lighting." },
  { id: "g5", url: "https://images.pexels.com/photos/15621210/pexels-photo-15621210.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", title: "Formal Event Setup", category: "Venue", description: "Luxurious banquet hall prepared for a formal event." },
  { id: "g6", url: "https://images.pexels.com/photos/17023021/pexels-photo-17023021.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", title: "Blossom Celebration", category: "Decor", description: "Indoor wedding setup with pink blossoms and elegant table arrangement." },
  { id: "g7", url: "https://images.pexels.com/photos/35985205/pexels-photo-35985205.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", title: "Candlelit Reception", category: "Weddings", description: "Wedding reception setup featuring elegant floral arrangements and candlelit tables." }
];

export const ADMIN_PASSWORD = "royalchance2026";
const STORAGE_KEYS = { adminAuth: "rcp_admin_auth" };
const COLLECTION_NAME = "chancepalace_data";

export async function loadSettings(): Promise<SiteSettings> {
  try {
    const docRef = doc(db, COLLECTION_NAME, "settings");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...defaultSettings, ...docSnap.data() } as SiteSettings;
    }
  } catch (error) {
    console.error("Error loading settings from Firebase:", error);
  }
  return defaultSettings;
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, "settings");
    await setDoc(docRef, settings);
  } catch (error) {
    console.error("Error saving settings to Firebase:", error);
  }
}

export async function loadPackages(): Promise<PackageItem[]> {
  try {
    const docRef = doc(db, COLLECTION_NAME, "packages");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().items as PackageItem[];
    }
  } catch (error) {
    console.error("Error loading packages from Firebase:", error);
  }
  return defaultPackages;
}

export async function savePackages(packages: PackageItem[]): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, "packages");
    await setDoc(docRef, { items: packages });
  } catch (error) {
    console.error("Error saving packages to Firebase:", error);
  }
}

export async function loadGallery(): Promise<GalleryImage[]> {
  try {
    const docRef = doc(db, COLLECTION_NAME, "gallery");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().items as GalleryImage[];
    }
  } catch (error) {
    console.error("Error loading gallery from Firebase:", error);
  }
  return defaultGalleryImages;
}

export async function saveGallery(images: GalleryImage[]): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, "gallery");
    await setDoc(docRef, { items: images });
  } catch (error) {
    console.error("Error saving gallery to Firebase:", error);
  }
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

export async function resetAllData(): Promise<void> {
  await saveSettings(defaultSettings);
  await savePackages(defaultPackages);
  await saveGallery(defaultGalleryImages);
}