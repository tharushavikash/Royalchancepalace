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

type Tab = "settings" | "packages" | "gallery";

const emptyPackage: Omit<PackageItem, "id"> = {
  name: "",
  price: "",
  currency: "LKR",
  description: "",
  features: [],
  image: "",
  popular: false,
  category: "wedding",
  capacity: "",
};

const emptyImage: Omit<GalleryImage, "id"> = {
  url: "",
  title: "",
  category: "Venue",
  description: "",
};

export default function AdminPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("settings");
  const [settings, setSettings] = useState<SiteSettings>(loadSettings());
  const [packages, setPackages] = useState<PackageItem[]>(loadPackages());
  const [gallery, setGallery] = useState<GalleryImage[]>(loadGallery());
  const [savedMessage, setSavedMessage] = useState("");

  // Package editing state
  const [editingPackage, setEditingPackage] = useState<PackageItem | null>(null);
  const [isAddingPackage, setIsAddingPackage] = useState(false);
  const [packageForm, setPackageForm] = useState<Omit<PackageItem, "id">>(emptyPackage);
  const [featureInput, setFeatureInput] = useState("");

  // Gallery editing state
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [imageForm, setImageForm] = useState<Omit<GalleryImage, "id">>(emptyImage);

  // Auth check
  useEffect(() => {
    if (!checkAdminAuth()) {
      navigate("/admin");
    }
  }, [navigate]);

  const showSaved = (msg: string) => {
    setSavedMessage(msg);
    setTimeout(() => setSavedMessage(""), 3000);
  };

  const handleLogout = () => {
    setAdminAuth(false);
    navigate("/admin");
  };

  // ==================== SETTINGS ====================
  const handleSaveSettings = () => {
    saveSettings(settings);
    showSaved("✅ Site settings saved successfully!");
  };

  const handleResetSettings = () => {
    if (confirm("Reset site settings to default values?")) {
      setSettings(defaultSettings);
      saveSettings(defaultSettings);
      showSaved("✅ Settings reset to defaults!");
    }
  };

  // ==================== PACKAGES ====================
  const openAddPackage = () => {
    setPackageForm(emptyPackage);
    setFeatureInput("");
    setIsAddingPackage(true);
    setEditingPackage(null);
  };

  const openEditPackage = (pkg: PackageItem) => {
    setPackageForm({ ...pkg });
    setFeatureInput("");
    setEditingPackage(pkg);
    setIsAddingPackage(false);
  };

  const closePackageForm = () => {
    setIsAddingPackage(false);
    setEditingPackage(null);
    setPackageForm(emptyPackage);
    setFeatureInput("");
  };

  const handleSavePackage = () => {
    if (!packageForm.name || !packageForm.price) {
      alert("Please enter at least a package name and price.");
      return;
    }
    if (editingPackage) {
      const updated = packages.map((p) =>
        p.id === editingPackage.id ? { ...packageForm, id: p.id } : p
      );
      setPackages(updated);
      savePackages(updated);
      showSaved("✅ Package updated successfully!");
    } else {
      const newPkg: PackageItem = {
        ...packageForm,
        id: `pkg-${Date.now()}`,
      };
      const updated = [...packages, newPkg];
      setPackages(updated);
      savePackages(updated);
      showSaved("✅ Package added successfully!");
    }
    closePackageForm();
  };

  const handleDeletePackage = (id: string) => {
    if (confirm("Are you sure you want to delete this package?")) {
      const updated = packages.filter((p) => p.id !== id);
      setPackages(updated);
      savePackages(updated);
      showSaved("✅ Package deleted!");
    }
  };

  const addFeature = () => {
    const trimmed = featureInput.trim();
    if (trimmed && !packageForm.features.includes(trimmed)) {
      setPackageForm({ ...packageForm, features: [...packageForm.features, trimmed] });
      setFeatureInput("");
    }
  };

  const removeFeature = (index: number) => {
    setPackageForm({
      ...packageForm,
      features: packageForm.features.filter((_, i) => i !== index),
    });
  };

  // ==================== GALLERY ====================
  const openAddImage = () => {
    setImageForm(emptyImage);
    setIsAddingImage(true);
    setEditingImage(null);
  };

  const openEditImage = (img: GalleryImage) => {
    setImageForm({ ...img });
    setEditingImage(img);
    setIsAddingImage(false);
  };

  const closeImageForm = () => {
    setIsAddingImage(false);
    setEditingImage(null);
    setImageForm(emptyImage);
  };

  const handleSaveImage = () => {
    if (!imageForm.url || !imageForm.title) {
      alert("Please enter at least an image URL and title.");
      return;
    }
    if (editingImage) {
      const updated = gallery.map((g) =>
        g.id === editingImage.id ? { ...imageForm, id: g.id } : g
      );
      setGallery(updated);
      saveGallery(updated);
      showSaved("✅ Image updated successfully!");
    } else {
      const newImg: GalleryImage = { ...imageForm, id: `img-${Date.now()}` };
      const updated = [...gallery, newImg];
      setGallery(updated);
      saveGallery(updated);
      showSaved("✅ Image added successfully!");
    }
    closeImageForm();
  };

  const handleDeleteImage = (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      const updated = gallery.filter((g) => g.id !== id);
      setGallery(updated);
      saveGallery(updated);
      showSaved("✅ Image deleted!");
    }
  };

  // ==================== RESET ALL ====================
  const handleResetAll = () => {
    if (
      confirm(
        "⚠️ This will reset ALL data (settings, packages, gallery) to default values. This cannot be undone. Continue?"
      )
    ) {
      resetAllData();
      setSettings(defaultSettings);
      setPackages(defaultPackages);
      setGallery(defaultGalleryImages);
      showSaved("✅ All data reset to defaults!");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "settings", label: "Site Settings", icon: "⚙️" },
    { id: "packages", label: `Packages (${packages.length})`, icon: "📦" },
    { id: "gallery", label: `Gallery (${gallery.length})`, icon: "🖼️" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="sticky top-0 z-40 bg-gray-900 text-white shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={settings.logo}
                alt=""
                className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-amber-400"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">Admin Panel</p>
                <p className="hidden sm:block truncate text-xs text-gray-400">
                  {settings.businessName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => navigate("/")}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-medium transition-all hover:bg-white/20"
              >
                🌐 View Site
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-full bg-red-500/90 px-4 py-2 text-xs font-semibold transition-all hover:bg-red-600"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Saved Toast */}
      {savedMessage && (
        <div className="fixed bottom-4 right-4 z-50 animate-bounce rounded-xl bg-green-600 px-5 py-3 text-sm font-medium text-white shadow-2xl">
          {savedMessage}
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8 flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md"
                  : "bg-white text-gray-600 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ==================== SETTINGS TAB ==================== */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-gray-100">
              <h2 className="text-lg font-bold text-gray-900">🏢 Business Information</h2>
              <div className="mt-6 grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Business Name</label>
                  <input
                    className={inputClass}
                    value={settings.businessName}
                    onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                  />
                </div>
                <div>
                  <label className={labelClass}>Tagline</label>
                  <input
                    className={inputClass}
                    value={settings.tagline}
                    onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input
                    className={inputClass}
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input
                    className={inputClass}
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Address</label>
                  <input
                    className={inputClass}
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  />
                </div>
                <div>
                  <label className={labelClass}>Website</label>
                  <input
                    className={inputClass}
                    value={settings.website}
                    onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                  />
                </div>
                <div>
                  <label className={labelClass}>Opening Hours</label>
                  <input
                    className={inputClass}
                    value={settings.openingHours}
                    onChange={(e) => setSettings({ ...settings, openingHours: e.target.value })}
                  />
                </div>
                <div>
                  <label className={labelClass}>Rating</label>
                  <input
                    className={inputClass}
                    value={settings.rating}
                    onChange={(e) => setSettings({ ...settings, rating: e.target.value })}
                  />
                </div>
                <div>
                  <label className={labelClass}>Review Count</label>
                  <input
                    className={inputClass}
                    value={settings.reviewCount}
                    onChange={(e) => setSettings({ ...settings, reviewCount: e.target.value })}
                  />
                </div>
                <div>
                  <label className={labelClass}>Facebook URL</label>
                  <input
                    className={inputClass}
                    value={settings.facebook}
                    onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                  />
                </div>
                <div>
                  <label className={labelClass}>Instagram URL</label>
                  <input
                    className={inputClass}
                    value={settings.instagram}
                    onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>About Text</label>
                  <textarea
                    rows={4}
                    className={inputClass}
                    value={settings.aboutText}
                    onChange={(e) => setSettings({ ...settings, aboutText: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-gray-100">
              <h2 className="text-lg font-bold text-gray-900">🖼️ Brand Images</h2>
              <div className="mt-6 grid sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Logo Image URL</label>
                  <input
                    className={inputClass}
                    value={settings.logo}
                    onChange={(e) => setSettings({ ...settings, logo: e.target.value })}
                    placeholder="https://..."
                  />
                  {settings.logo && (
                    <div className="mt-3 flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                      <img
                        src={settings.logo}
                        alt="Logo preview"
                        className="h-14 w-14 rounded-full object-cover ring-2 ring-amber-400"
                      />
                      <span className="text-xs text-gray-500">Logo preview</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Hero Image URL (Homepage background)</label>
                  <input
                    className={inputClass}
                    value={settings.heroImage}
                    onChange={(e) => setSettings({ ...settings, heroImage: e.target.value })}
                    placeholder="https://..."
                  />
                  {settings.heroImage && (
                    <div className="mt-3 overflow-hidden rounded-xl bg-gray-50">
                      <img
                        src={settings.heroImage}
                        alt="Hero preview"
                        className="h-32 w-full object-cover"
                      />
                      <span className="block p-2 text-center text-xs text-gray-500">
                        Hero preview
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleSaveSettings}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-7 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:from-amber-600 hover:to-amber-700"
              >
                💾 Save Settings
              </button>
              <button
                onClick={handleResetSettings}
                className="inline-flex items-center gap-2 rounded-full bg-gray-200 px-7 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-300"
              >
                ↺ Reset Settings
              </button>
              <button
                onClick={handleResetAll}
                className="inline-flex items-center gap-2 rounded-full bg-red-100 px-7 py-3 text-sm font-semibold text-red-600 transition-all hover:bg-red-200"
              >
                🗑️ Reset All Data
              </button>
            </div>
          </div>
        )}

        {/* ==================== PACKAGES TAB ==================== */}
        {activeTab === "packages" && (
          <div>
            {/* Add/Edit Form */}
            {(isAddingPackage || editingPackage) && (
              <div className="mb-8 rounded-2xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-amber-200">
                <h2 className="text-lg font-bold text-gray-900">
                  {editingPackage ? "✏️ Edit Package" : "➕ Add New Package"}
                </h2>
                <div className="mt-6 grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Package Name *</label>
                    <input
                      className={inputClass}
                      value={packageForm.name}
                      onChange={(e) => setPackageForm({ ...packageForm, name: e.target.value })}
                      placeholder="e.g. Gold Wedding Package"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Price (LKR) *</label>
                    <input
                      className={inputClass}
                      value={packageForm.price}
                      onChange={(e) => setPackageForm({ ...packageForm, price: e.target.value })}
                      placeholder="e.g. 650,000"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Capacity</label>
                    <input
                      className={inputClass}
                      value={packageForm.capacity}
                      onChange={(e) => setPackageForm({ ...packageForm, capacity: e.target.value })}
                      placeholder="e.g. Up to 200 guests"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Category</label>
                    <select
                      className={inputClass}
                      value={packageForm.category}
                      onChange={(e) =>
                        setPackageForm({
                          ...packageForm,
                          category: e.target.value as PackageItem["category"],
                        })
                      }
                    >
                      <option value="wedding">Wedding</option>
                      <option value="birthday">Birthday</option>
                      <option value="corporate">Corporate</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Image URL</label>
                    <input
                      className={inputClass}
                      value={packageForm.image}
                      onChange={(e) => setPackageForm({ ...packageForm, image: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Description</label>
                    <textarea
                      rows={3}
                      className={inputClass}
                      value={packageForm.description}
                      onChange={(e) =>
                        setPackageForm({ ...packageForm, description: e.target.value })
                      }
                      placeholder="Brief description of the package..."
                    />
                  </div>
                  {/* Features */}
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Features (included items)</label>
                    <div className="flex gap-2">
                      <input
                        className={inputClass}
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addFeature();
                          }
                        }}
                        placeholder="Type a feature and press Enter or click +"
                      />
                      <button
                        type="button"
                        onClick={addFeature}
                        className="shrink-0 rounded-xl bg-amber-100 px-4 text-amber-700 font-bold transition-all hover:bg-amber-200"
                      >
                        +
                      </button>
                    </div>
                    {packageForm.features.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {packageForm.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-amber-500">✓</span> {feature}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFeature(i)}
                              className="text-red-400 hover:text-red-600"
                            >
                              ✕
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="sm:col-span-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="popular"
                      checked={packageForm.popular}
                      onChange={(e) =>
                        setPackageForm({ ...packageForm, popular: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                    <label htmlFor="popular" className="text-sm font-medium text-gray-700">
                      Mark as "Most Popular" package
                    </label>
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={handleSavePackage}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-7 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-amber-600 hover:to-amber-700"
                  >
                    💾 {editingPackage ? "Update Package" : "Add Package"}
                  </button>
                  <button
                    onClick={closePackageForm}
                    className="inline-flex items-center gap-2 rounded-full bg-gray-200 px-7 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Packages List */}
            {!isAddingPackage && !editingPackage && (
              <>
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">
                    All Packages ({packages.length})
                  </h2>
                  <button
                    onClick={openAddPackage}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-amber-600 hover:to-amber-700"
                  >
                    ➕ Add Package
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md"
                    >
                      <div className="relative aspect-video overflow-hidden bg-gray-100">
                        {pkg.image ? (
                          <img
                            src={pkg.image}
                            alt={pkg.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-4xl">📦</div>
                        )}
                        {pkg.popular && (
                          <span className="absolute top-2 right-2 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold text-white">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900">{pkg.name}</h3>
                        <p className="mt-0.5 text-xs text-gray-500">
                          {pkg.capacity} · {pkg.category}
                        </p>
                        <p className="mt-2 text-lg font-bold text-amber-600">
                          {pkg.currency} {pkg.price}
                        </p>
                        <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                          {pkg.description}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          {pkg.features.length} features
                        </p>
                        <div className="mt-4 flex gap-2">
                          <button
                            onClick={() => openEditPackage(pkg)}
                            className="flex-1 rounded-full bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 transition-all hover:bg-amber-100"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDeletePackage(pkg.id)}
                            className="flex-1 rounded-full bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition-all hover:bg-red-100"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {packages.length === 0 && (
                  <div className="rounded-2xl bg-white py-16 text-center shadow-sm ring-1 ring-gray-100">
                    <p className="text-5xl mb-4">📦</p>
                    <p className="text-gray-500">No packages yet. Click "Add Package" to create one.</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ==================== GALLERY TAB ==================== */}
        {activeTab === "gallery" && (
          <div>
            {/* Add/Edit Form */}
            {(isAddingImage || editingImage) && (
              <div className="mb-8 rounded-2xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-amber-200">
                <h2 className="text-lg font-bold text-gray-900">
                  {editingImage ? "✏️ Edit Image" : "➕ Add New Image"}
                </h2>
                <div className="mt-6 grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Image URL *</label>
                    <input
                      className={inputClass}
                      value={imageForm.url}
                      onChange={(e) => setImageForm({ ...imageForm, url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Title *</label>
                    <input
                      className={inputClass}
                      value={imageForm.title}
                      onChange={(e) => setImageForm({ ...imageForm, title: e.target.value })}
                      placeholder="e.g. Elegant Wedding Reception"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Category</label>
                    <input
                      className={inputClass}
                      value={imageForm.category}
                      onChange={(e) => setImageForm({ ...imageForm, category: e.target.value })}
                      placeholder="e.g. Weddings, Venue, Food & Drink, Decor, Birthdays, Corporate"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Description</label>
                    <textarea
                      rows={2}
                      className={inputClass}
                      value={imageForm.description}
                      onChange={(e) =>
                        setImageForm({ ...imageForm, description: e.target.value })
                      }
                      placeholder="Optional description..."
                    />
                  </div>
                  {imageForm.url && (
                    <div className="sm:col-span-2">
                      <label className={labelClass}>Preview</label>
                      <img
                        src={imageForm.url}
                        alt="Preview"
                        className="h-40 w-full rounded-xl object-cover ring-1 ring-gray-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={handleSaveImage}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-7 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-amber-600 hover:to-amber-700"
                  >
                    💾 {editingImage ? "Update Image" : "Add Image"}
                  </button>
                  <button
                    onClick={closeImageForm}
                    className="inline-flex items-center gap-2 rounded-full bg-gray-200 px-7 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Gallery List */}
            {!isAddingImage && !editingImage && (
              <>
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">
                    All Images ({gallery.length})
                  </h2>
                  <button
                    onClick={openAddImage}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-amber-600 hover:to-amber-700"
                  >
                    ➕ Add Image
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {gallery.map((img) => (
                    <div
                      key={img.id}
                      className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100"
                    >
                      <div className="relative aspect-square overflow-hidden bg-gray-100">
                        <img
                          src={img.url}
                          alt={img.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center gap-2">
                          <button
                            onClick={() => openEditImage(img)}
                            className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-amber-700 shadow"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDeleteImage(img.id)}
                            className="rounded-full bg-red-500 px-3 py-1.5 text-xs font-semibold text-white shadow"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                        <span className="absolute bottom-1.5 left-1.5 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                          {img.category}
                        </span>
                      </div>
                      <div className="p-3">
                        <p className="truncate text-sm font-semibold text-gray-900">{img.title}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {gallery.length === 0 && (
                  <div className="rounded-2xl bg-white py-16 text-center shadow-sm ring-1 ring-gray-100">
                    <p className="text-5xl mb-4">🖼️</p>
                    <p className="text-gray-500">No images yet. Click "Add Image" to upload one.</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
