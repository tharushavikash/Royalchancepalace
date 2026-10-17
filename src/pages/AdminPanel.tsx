import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  checkAdminAuth,
  setAdminAuth,
  loadSettings,
  saveSettings,
  loadPackages,
  savePackages,
  loadGallery,
  saveGallery,
  resetAllData,
  defaultSettings,
  defaultPackages,
  defaultGalleryImages,
  type SiteSettings,
  type PackageItem,
  type GalleryImage,
} from "../data/defaultData";

type Tab = "settings" | "pricing" | "menus" | "packages" | "gallery";

const emptyPackage: Omit<PackageItem, "id"> = {
  name: "", price: "", currency: "LKR", description: "", features: [], image: "", popular: false, category: "wedding", capacity: "",
};

const emptyImage: Omit<GalleryImage, "id"> = {
  url: "", title: "", category: "Venue", description: "",
};

// --- SMART COMPRESSOR FOR URLS ---
// Automatically requests small thumbnails from ImageKit/Pexels for the Admin Grid to stop lag!
const getOptimizedUrl = (url: string) => {
  if (!url) return "";
  if (url.includes("ik.imagekit.io") && !url.includes("tr=")) return `${url}?tr=w-400,h-400,q-70,fo-auto`;
  if (url.includes("images.pexels.com")) {
    if (!url.includes("?")) return `${url}?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop`;
    return url.replace(/w=\d+/, "w=400").replace(/h=\d+/, "h=400");
  }
  return url;
};

export default function AdminPanel() {
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("settings");
  
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [packages, setPackages] = useState<PackageItem[]>(defaultPackages);
  const [gallery, setGallery] = useState<GalleryImage[]>(defaultGalleryImages);
  
  const [savedMessage, setSavedMessage] = useState("");

  const [editingPackage, setEditingPackage] = useState<PackageItem | null>(null);
  const [isAddingPackage, setIsAddingPackage] = useState(false);
  const [packageForm, setPackageForm] = useState<Omit<PackageItem, "id">>(emptyPackage);
  const [featureInput, setFeatureInput] = useState("");

  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [imageForm, setImageForm] = useState<Omit<GalleryImage, "id">>(emptyImage);

  const [isBulkAdding, setIsBulkAdding] = useState(false);
  const [bulkUrls, setBulkUrls] = useState("");
  const [bulkTitle, setBulkTitle] = useState("Gallery Image");
  const [bulkCategory, setBulkCategory] = useState("Venue");

  useEffect(() => {
    if (!checkAdminAuth()) {
      navigate("/admin");
      return;
    }
    const fetchFirebaseData = async () => {
      setIsLoading(true);
      try {
        const fetchedSettings = await loadSettings();
        const fetchedPackages = await loadPackages();
        const fetchedGallery = await loadGallery();
        setSettings(fetchedSettings);
        setPackages(fetchedPackages);
        setGallery(fetchedGallery);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFirebaseData();
  }, [navigate]);

  const showSaved = (msg: string) => {
    setSavedMessage(msg);
    setTimeout(() => setSavedMessage(""), 3000);
  };

  const handleLogout = () => {
    setAdminAuth(false);
    navigate("/admin");
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    await saveSettings(settings);
    setIsSaving(false);
    showSaved("✅ Cloud data updated successfully!");
  };

  // PACKAGES LOGIC
  const openAddPackage = () => { setPackageForm(emptyPackage); setFeatureInput(""); setIsAddingPackage(true); setEditingPackage(null); };
  const openEditPackage = (pkg: PackageItem) => { setPackageForm({ ...pkg }); setFeatureInput(""); setEditingPackage(pkg); setIsAddingPackage(false); };
  const closePackageForm = () => { setIsAddingPackage(false); setEditingPackage(null); setPackageForm(emptyPackage); setFeatureInput(""); };

  const handleSavePackage = async () => {
    if (!packageForm.name || !packageForm.price) return alert("Please enter at least a package name and price.");
    setIsSaving(true);
    if (editingPackage) {
      const updated = packages.map((p) => p.id === editingPackage.id ? { ...packageForm, id: p.id } : p);
      setPackages(updated); await savePackages(updated); showSaved("✅ Package updated in Cloud!");
    } else {
      const newPkg: PackageItem = { ...packageForm, id: `pkg-${Date.now()}` };
      const updated = [...packages, newPkg];
      setPackages(updated); await savePackages(updated); showSaved("✅ Package added to Cloud!");
    }
    setIsSaving(false); closePackageForm();
  };

  const handleDeletePackage = async (id: string) => {
    if (confirm("Are you sure you want to delete this package?")) {
      setIsSaving(true); const updated = packages.filter((p) => p.id !== id);
      setPackages(updated); await savePackages(updated); setIsSaving(false); showSaved("✅ Package deleted from Cloud!");
    }
  };

  const addFeature = () => {
    const trimmed = featureInput.trim();
    if (trimmed && !packageForm.features.includes(trimmed)) {
      setPackageForm({ ...packageForm, features: [...packageForm.features, trimmed] }); setFeatureInput("");
    }
  };

  const removeFeature = (index: number) => {
    setPackageForm({ ...packageForm, features: packageForm.features.filter((_, i) => i !== index) });
  };

  // GALLERY LOGIC (SINGLE)
  const openAddImage = () => { setIsBulkAdding(false); setImageForm(emptyImage); setIsAddingImage(true); setEditingImage(null); };
  const openEditImage = (img: GalleryImage) => { setIsBulkAdding(false); setImageForm({ ...img }); setEditingImage(img); setIsAddingImage(false); };
  const closeImageForm = () => { setIsAddingImage(false); setEditingImage(null); setImageForm(emptyImage); };

  const handleSaveImage = async () => {
    if (!imageForm.url || !imageForm.title) return alert("Please enter at least an image URL and title.");
    setIsSaving(true);
    if (editingImage) {
      const updated = gallery.map((g) => g.id === editingImage.id ? { ...imageForm, id: g.id } : g);
      setGallery(updated); await saveGallery(updated); showSaved("✅ Image updated in Cloud!");
    } else {
      const newImg: GalleryImage = { ...imageForm, id: `img-${Date.now()}` };
      const updated = [...gallery, newImg];
      setGallery(updated); await saveGallery(updated); showSaved("✅ Image added to Cloud!");
    }
    setIsSaving(false); closeImageForm();
  };

  const handleDeleteImage = async (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      setIsSaving(true); const updated = gallery.filter((g) => g.id !== id);
      setGallery(updated); await saveGallery(updated); setIsSaving(false); showSaved("✅ Image deleted from Cloud!");
    }
  };

  // GALLERY LOGIC (BULK URL)
  const openBulkAdd = () => { setIsAddingImage(false); setEditingImage(null); setIsBulkAdding(true); setBulkUrls(""); setBulkTitle("Gallery Image"); setBulkCategory("Venue"); };
  const closeBulkForm = () => { setIsBulkAdding(false); setBulkUrls(""); };

  const handleSaveBulkUrls = async () => {
    if (!bulkUrls.trim()) return alert("Please enter at least one image URL.");
    setIsSaving(true);
    const urls = bulkUrls.split("\n").map(u => u.trim()).filter(u => u !== "");
    const newImages: GalleryImage[] = urls.map((url, index) => ({
      id: `img-${Date.now()}-${index}`, url, title: bulkTitle || "Gallery Image", category: bulkCategory || "Venue", description: "",
    }));
    const updated = [...gallery, ...newImages];
    setGallery(updated); await saveGallery(updated);
    setIsSaving(false); showSaved(`✅ ${newImages.length} images added via URLs!`); closeBulkForm();
  };

  const handleResetAll = async () => {
    if (confirm("⚠️ This will reset ALL data in the Cloud to default values. Continue?")) {
      setIsSaving(true); await resetAllData();
      setSettings(defaultSettings); setPackages(defaultPackages); setGallery(defaultGalleryImages);
      setIsSaving(false); showSaved("✅ All Cloud data reset to defaults!");
    }
  };

  const inputClass = "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "settings", label: "Site Settings", icon: "⚙️" },
    { id: "pricing", label: "Master Price Chart", icon: "📊" },
    { id: "menus", label: "Menus & Bites", icon: "🍽️" },
    { id: "packages", label: `Packages (${packages.length})`, icon: "📦" },
    { id: "gallery", label: `Gallery (${gallery.length})`, icon: "🖼️" },
  ];

  if (isLoading) return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <div className="text-center"><div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-amber-200 border-t-amber-600 mx-auto"></div><p className="font-semibold text-gray-600">Loading Cloud Data...</p></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-40 bg-gray-900 text-white shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <img src={getOptimizedUrl(settings.logo)} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-amber-400" decoding="async" />
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">Admin Panel (Cloud)</p>
                <p className="hidden sm:block truncate text-xs text-gray-400">{settings.businessName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button onClick={() => navigate("/")} className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-medium transition-all hover:bg-white/20">🌐 View Site</button>
              <button onClick={handleLogout} className="inline-flex items-center gap-1.5 rounded-full bg-red-500/90 px-4 py-2 text-xs font-semibold transition-all hover:bg-red-600">🚪 Logout</button>
            </div>
          </div>
        </div>
      </header>

      {savedMessage && <div className="fixed bottom-4 right-4 z-50 animate-bounce rounded-xl bg-green-600 px-5 py-3 text-sm font-medium text-white shadow-2xl">{savedMessage}</div>}
      {isSaving && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"><div className="rounded-xl bg-white px-6 py-4 shadow-xl flex items-center gap-3"><div className="h-5 w-5 animate-spin rounded-full border-2 border-amber-200 border-t-amber-600"></div><p className="text-sm font-bold text-gray-700">Syncing to Cloud...</p></div></div>}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${activeTab === tab.id ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md" : "bg-white text-gray-600 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50"}`}>
              <span>{tab.icon}</span>{tab.label}
            </button>
          ))}
        </div>

        {/* ==================== SETTINGS TAB ==================== */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-gray-100">
              <h2 className="text-lg font-bold text-gray-900">🏢 Business Information</h2>
              <div className="mt-6 grid sm:grid-cols-2 gap-5">
                <div><label className={labelClass}>Business Name</label><input className={inputClass} value={settings.businessName} onChange={(e) => setSettings({ ...settings, businessName: e.target.value })} /></div>
                <div><label className={labelClass}>Tagline</label><input className={inputClass} value={settings.tagline} onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} /></div>
                <div><label className={labelClass}>Phone</label><input className={inputClass} value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} /></div>
                <div><label className={labelClass}>Email</label><input className={inputClass} value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} /></div>
                <div className="sm:col-span-2"><label className={labelClass}>Address</label><input className={inputClass} value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} /></div>
                
                <div className="sm:col-span-2 mt-4 pt-4 border-t border-gray-100">
                  <h3 className="text-md font-bold text-gray-800 mb-4">Homepage Banner Stats</h3>
                  <div className="grid sm:grid-cols-4 gap-4">
                    <div><label className={labelClass}>Review Count</label><input className={inputClass} value={settings.reviewCount} onChange={(e) => setSettings({ ...settings, reviewCount: e.target.value })} /></div>
                    <div><label className={labelClass}>Events Hosted</label><input className={inputClass} value={settings.eventsHosted} onChange={(e) => setSettings({ ...settings, eventsHosted: e.target.value })} /></div>
                    <div><label className={labelClass}>Max Capacity</label><input className={inputClass} value={settings.maxCapacity} onChange={(e) => setSettings({ ...settings, maxCapacity: e.target.value })} /></div>
                    <div><label className={labelClass}>Guest Rating</label><input className={inputClass} value={settings.rating} onChange={(e) => setSettings({ ...settings, rating: e.target.value })} /></div>
                  </div>
                </div>
                <div className="sm:col-span-2 mt-4 pt-4 border-t border-gray-100">
                  <label className={labelClass}>About Text</label><textarea rows={4} className={inputClass} value={settings.aboutText} onChange={(e) => setSettings({ ...settings, aboutText: e.target.value })} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-gray-100">
              <h2 className="text-lg font-bold text-gray-900">🖼️ Brand Images</h2>
              <div className="mt-6 grid sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Logo Image URL</label><input className={inputClass} value={settings.logo} onChange={(e) => setSettings({ ...settings, logo: e.target.value })} />
                  {settings.logo && <div className="mt-3 flex items-center gap-3 rounded-xl bg-gray-50 p-3"><img src={getOptimizedUrl(settings.logo)} alt="Logo" className="h-14 w-14 rounded-full object-cover ring-2 ring-amber-400" /></div>}
                </div>
                <div>
                  <label className={labelClass}>Hero Image URL</label><input className={inputClass} value={settings.heroImage} onChange={(e) => setSettings({ ...settings, heroImage: e.target.value })} />
                  {settings.heroImage && <div className="mt-3 overflow-hidden rounded-xl bg-gray-50"><img src={getOptimizedUrl(settings.heroImage)} alt="Hero" className="h-32 w-full object-cover" /></div>}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button onClick={handleSaveSettings} disabled={isSaving} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-7 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:from-amber-600 hover:to-amber-700 disabled:opacity-50">💾 Save Settings</button>
              <button onClick={handleResetAll} disabled={isSaving} className="inline-flex items-center gap-2 rounded-full bg-red-100 px-7 py-3 text-sm font-semibold text-red-600 transition-all hover:bg-red-200 disabled:opacity-50">🗑️ Reset Entire Website</button>
            </div>
          </div>
        )}

        {/* ==================== PRICING TAB ==================== */}
        {activeTab === "pricing" && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-gray-100">
              <div className="mb-6 border-b border-gray-100 pb-4"><h2 className="text-xl font-bold text-gray-900">📊 Master Price Chart</h2></div>
              <div className="grid gap-4 max-w-3xl">
                <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-gray-200"><div className="w-24 font-bold text-gray-700">100 PAX</div><input className={inputClass} value={settings.priceChart100} onChange={(e) => setSettings({ ...settings, priceChart100: e.target.value })} /></div>
                <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-gray-200"><div className="w-24 font-bold text-gray-700">150 PAX</div><input className={inputClass} value={settings.priceChart150} onChange={(e) => setSettings({ ...settings, priceChart150: e.target.value })} /></div>
                <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-gray-200"><div className="w-24 font-bold text-gray-700">200 PAX</div><input className={inputClass} value={settings.priceChart200} onChange={(e) => setSettings({ ...settings, priceChart200: e.target.value })} /></div>
                <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-gray-200"><div className="w-24 font-bold text-gray-700">250 PAX</div><input className={inputClass} value={settings.priceChart250} onChange={(e) => setSettings({ ...settings, priceChart250: e.target.value })} /></div>
                <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-gray-200"><div className="w-24 font-bold text-gray-700">300 PAX</div><input className={inputClass} value={settings.priceChart300} onChange={(e) => setSettings({ ...settings, priceChart300: e.target.value })} /></div>
                <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-gray-200"><div className="w-24 font-bold text-gray-700">350 PAX</div><input className={inputClass} value={settings.priceChart350} onChange={(e) => setSettings({ ...settings, priceChart350: e.target.value })} /></div>
                <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-gray-200"><div className="w-24 font-bold text-gray-700">400 PAX</div><input className={inputClass} value={settings.priceChart400} onChange={(e) => setSettings({ ...settings, priceChart400: e.target.value })} /></div>
              </div>
              <div className="mt-8"><button onClick={handleSaveSettings} disabled={isSaving} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-7 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:from-amber-600 hover:to-amber-700 disabled:opacity-50">💾 Save Price Chart</button></div>
            </div>
          </div>
        )}

        {/* ==================== MENUS TAB ==================== */}
        {activeTab === "menus" && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-gray-100">
              <div className="mb-6 border-b border-gray-100 pb-4"><h2 className="text-xl font-bold text-gray-900">🍽️ Wedding Menus & Bites</h2></div>
              <div className="grid gap-8">
                <div><h3 className="font-bold text-gray-800 mb-2">Silver Menu</h3><textarea rows={8} className={`${inputClass} font-mono text-xs`} value={settings.menuSilver} onChange={(e) => setSettings({ ...settings, menuSilver: e.target.value })} /></div>
                <div><h3 className="font-bold text-gray-800 mb-2">Gold Menu</h3><textarea rows={8} className={`${inputClass} font-mono text-xs`} value={settings.menuGold} onChange={(e) => setSettings({ ...settings, menuGold: e.target.value })} /></div>
                <div><h3 className="font-bold text-gray-800 mb-2">Platinum Menu</h3><textarea rows={8} className={`${inputClass} font-mono text-xs`} value={settings.menuPlatinum} onChange={(e) => setSettings({ ...settings, menuPlatinum: e.target.value })} /></div>
                <div className="border-t border-gray-200 pt-8"><h3 className="font-bold text-gray-800 mb-2">Bites Pricing</h3><textarea rows={6} className={`${inputClass} font-mono text-xs`} value={settings.bitesPricing} onChange={(e) => setSettings({ ...settings, bitesPricing: e.target.value })} /></div>
                <div><h3 className="font-bold text-gray-800 mb-2">Complimentary Bites Allocation</h3><textarea rows={4} className={`${inputClass} font-mono text-xs`} value={settings.complimentaryBites} onChange={(e) => setSettings({ ...settings, complimentaryBites: e.target.value })} /></div>
              </div>
              <div className="mt-8"><button onClick={handleSaveSettings} disabled={isSaving} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-7 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:from-amber-600 hover:to-amber-700 disabled:opacity-50">💾 Save All Menus</button></div>
            </div>
          </div>
        )}

        {/* ==================== PACKAGES TAB ==================== */}
        {activeTab === "packages" && (
          <div>
            {(isAddingPackage || editingPackage) && (
              <div className="mb-8 rounded-2xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-amber-200">
                <h2 className="text-lg font-bold text-gray-900">{editingPackage ? "✏️ Edit Package" : "➕ Add New Package"}</h2>
                <div className="mt-6 grid sm:grid-cols-2 gap-5">
                  <div><label className={labelClass}>Package Name *</label><input className={inputClass} value={packageForm.name} onChange={(e) => setPackageForm({ ...packageForm, name: e.target.value })} /></div>
                  <div><label className={labelClass}>Price (LKR) *</label><input className={inputClass} value={packageForm.price} onChange={(e) => setPackageForm({ ...packageForm, price: e.target.value })} /></div>
                  <div><label className={labelClass}>Capacity</label><input className={inputClass} value={packageForm.capacity} onChange={(e) => setPackageForm({ ...packageForm, capacity: e.target.value })} /></div>
                  <div>
                    <label className={labelClass}>Category</label>
                    <select className={inputClass} value={packageForm.category} onChange={(e) => setPackageForm({ ...packageForm, category: e.target.value as PackageItem["category"] })}>
                      <option value="wedding">Wedding</option><option value="birthday">Birthday</option><option value="corporate">Corporate</option><option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Image URL</label>
                    <input className={inputClass} value={packageForm.image} onChange={(e) => setPackageForm({ ...packageForm, image: e.target.value })} placeholder="https://..." />
                  </div>

                  <div className="sm:col-span-2"><label className={labelClass}>Description</label><textarea rows={3} className={inputClass} value={packageForm.description} onChange={(e) => setPackageForm({ ...packageForm, description: e.target.value })} /></div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Features (included items)</label>
                    <div className="flex gap-2">
                      <input className={inputClass} value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addFeature(); } }} />
                      <button type="button" onClick={addFeature} className="shrink-0 rounded-xl bg-amber-100 px-4 text-amber-700 font-bold hover:bg-amber-200">+</button>
                    </div>
                    {packageForm.features.length > 0 && (
                      <ul className="mt-3 space-y-2">{packageForm.features.map((feature, i) => (<li key={i} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm"><span className="flex items-center gap-2"><span className="text-amber-500">✓</span> {feature}</span><button type="button" onClick={() => removeFeature(i)} className="text-red-400 hover:text-red-600">✕</button></li>))}</ul>
                    )}
                  </div>
                  <div className="sm:col-span-2 flex items-center gap-2">
                    <input type="checkbox" id="popular" checked={packageForm.popular} onChange={(e) => setPackageForm({ ...packageForm, popular: e.target.checked })} className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                    <label htmlFor="popular" className="text-sm font-medium text-gray-700">Mark as "Most Popular" package</label>
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <button onClick={handleSavePackage} disabled={isSaving} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-7 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-amber-600 hover:to-amber-700 disabled:opacity-50">💾 {editingPackage ? "Update Package" : "Add Package"}</button>
                  <button onClick={closePackageForm} disabled={isSaving} className="inline-flex items-center gap-2 rounded-full bg-gray-200 px-7 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-300 disabled:opacity-50">Cancel</button>
                </div>
              </div>
            )}

            {!isAddingPackage && !editingPackage && (
              <>
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">All Packages ({packages.length})</h2>
                  <button onClick={openAddPackage} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-amber-600 hover:to-amber-700">➕ Add Package</button>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {packages.map((pkg) => (
                    <div key={pkg.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md">
                      <div className="relative aspect-video overflow-hidden bg-gray-100">
                        {pkg.image ? <img src={getOptimizedUrl(pkg.image)} alt={pkg.name} className="h-full w-full object-cover" decoding="async" loading="lazy" /> : <div className="flex h-full items-center justify-center text-4xl">📦</div>}
                        {pkg.popular && <span className="absolute top-2 right-2 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold text-white">Popular</span>}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900">{pkg.name}</h3>
                        <p className="mt-0.5 text-xs text-gray-500">{pkg.capacity} · {pkg.category}</p>
                        <p className="mt-2 text-lg font-bold text-amber-600">{pkg.currency} {pkg.price}</p>
                        <div className="mt-4 flex gap-2">
                          <button onClick={() => openEditPackage(pkg)} className="flex-1 rounded-full bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 hover:bg-amber-100">✏️ Edit</button>
                          <button onClick={() => handleDeletePackage(pkg.id)} className="flex-1 rounded-full bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100">🗑️ Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ==================== GALLERY TAB ==================== */}
        {activeTab === "gallery" && (
          <div>
            {/* BULK ADD FORM WITH URL UPLOAD ONLY */}
            {isBulkAdding && (
              <div className="mb-8 rounded-2xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-amber-200">
                <h2 className="text-lg font-bold text-gray-900 mb-2">📂 Bulk Add via ImageKit URLs</h2>
                <p className="text-sm text-gray-500 mb-6">Paste your ImageKit URLs here, separating each URL with a new line. They will be automatically compressed to prevent lag.</p>
                
                <div className="grid sm:grid-cols-2 gap-5 mb-6">
                  <div><label className={labelClass}>Default Title</label><input className={inputClass} value={bulkTitle} onChange={(e) => setBulkTitle(e.target.value)} placeholder="e.g., Wedding Setup" /></div>
                  <div><label className={labelClass}>Default Category</label><input className={inputClass} value={bulkCategory} onChange={(e) => setBulkCategory(e.target.value)} placeholder="e.g., Venue" /></div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <label className="block text-sm font-bold text-gray-700 mb-2">🔗 Image URLs (One per line)</label>
                  <textarea rows={6} className={inputClass} value={bulkUrls} onChange={(e) => setBulkUrls(e.target.value)} placeholder="https://ik.imagekit.io/your_id/image1.jpg&#10;https://ik.imagekit.io/your_id/image2.jpg" />
                </div>
                
                <div className="mt-6 flex gap-3">
                  <button onClick={handleSaveBulkUrls} disabled={isSaving || !bulkUrls.trim()} className="inline-flex justify-center items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-7 py-2.5 text-sm font-semibold text-white shadow hover:from-amber-600 hover:to-amber-700 disabled:opacity-50">
                    💾 Save All URLs
                  </button>
                  <button onClick={closeBulkForm} disabled={isSaving} className="inline-flex items-center gap-2 rounded-full bg-gray-200 px-7 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-300 disabled:opacity-50">Cancel</button>
                </div>
              </div>
            )}

            {/* SINGLE ADD / EDIT FORM (URL ONLY) */}
            {(isAddingImage || editingImage) && !isBulkAdding && (
              <div className="mb-8 rounded-2xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-amber-200">
                <h2 className="text-lg font-bold text-gray-900">{editingImage ? "✏️ Edit Image" : "➕ Add Single Image"}</h2>
                <div className="mt-6 grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Image URL *</label>
                    <input className={inputClass} value={imageForm.url} onChange={(e) => setImageForm({ ...imageForm, url: e.target.value })} placeholder="https://ik.imagekit.io/..." />
                  </div>
                  <div><label className={labelClass}>Title *</label><input className={inputClass} value={imageForm.title} onChange={(e) => setImageForm({ ...imageForm, title: e.target.value })} /></div>
                  <div><label className={labelClass}>Category</label><input className={inputClass} value={imageForm.category} onChange={(e) => setImageForm({ ...imageForm, category: e.target.value })} /></div>
                  {imageForm.url && <div className="sm:col-span-2"><label className={labelClass}>Preview (Optimized)</label><img src={getOptimizedUrl(imageForm.url)} alt="Preview" className="h-40 w-full rounded-xl object-cover ring-1 ring-gray-200" decoding="async" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}/></div>}
                </div>
                <div className="mt-6 flex gap-3">
                  <button onClick={handleSaveImage} disabled={isSaving} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-7 py-2.5 text-sm font-semibold text-white shadow-lg hover:from-amber-600 hover:to-amber-700 disabled:opacity-50">💾 {editingImage ? "Update Image" : "Add Image"}</button>
                  <button onClick={closeImageForm} disabled={isSaving} className="inline-flex items-center gap-2 rounded-full bg-gray-200 px-7 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-300 disabled:opacity-50">Cancel</button>
                </div>
              </div>
            )}

            {/* GALLERY GRID */}
            {!isAddingImage && !editingImage && !isBulkAdding && (
              <>
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">All Images ({gallery.length})</h2>
                  <div className="flex gap-3">
                    <button onClick={openBulkAdd} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-amber-700 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50">📂 Bulk Add</button>
                    <button onClick={openAddImage} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-amber-600 hover:to-amber-700">➕ Add Image</button>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {gallery.map((img) => (
                    <div key={img.id} className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
                      <div className="relative aspect-square overflow-hidden bg-gray-100">
                        <img src={getOptimizedUrl(img.url)} alt={img.title} decoding="async" loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center gap-2">
                          <button onClick={() => openEditImage(img)} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-amber-700 shadow">✏️ Edit</button>
                          <button onClick={() => handleDeleteImage(img.id)} className="rounded-full bg-red-500 px-3 py-1.5 text-xs font-semibold text-white shadow">🗑️ Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}