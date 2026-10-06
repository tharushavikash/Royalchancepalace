import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN_PASSWORD, setAdminAuth, loadSettings } from "../data/defaultData";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const settings = loadSettings();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAdminAuth(true);
      navigate("/admin/dashboard");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 p-4">
      <div className="w-full max-w-md">
        <div className="rounded-3xl bg-white p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center">
            <img
              src={settings.logo}
              alt={settings.businessName}
              className="mx-auto h-20 w-20 rounded-full object-cover ring-4 ring-amber-400 shadow-lg"
            />
            <h1 className="mt-4 text-xl font-bold text-gray-900">Admin Panel</h1>
            <p className="mt-1 text-sm text-gray-500">{settings.businessName}</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter admin password"
                autoFocus
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 ring-1 ring-red-200">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/30 transition-all hover:from-amber-600 hover:to-amber-700"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-400">
            Authorized personnel only. Default password: <code className="rounded bg-gray-100 px-1.5 py-0.5 text-amber-600">royalchance2026</code>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} {settings.businessName}
        </p>
      </div>
    </div>
  );
}
