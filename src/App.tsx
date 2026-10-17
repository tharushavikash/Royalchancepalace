import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import WeddingPage from "./pages/WeddingPage"; // අලුතින් එකතු කළ Wedding Page එක
import Packages from "./pages/Packages";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import WhatsAppButton from "./components/WhatsAppButton";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";


function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminPanel />} />
      </Routes>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-16 sm:pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/wedding" element={<WeddingPage />} /> {/* අලුත් Route එක */}
          <Route path="/packages" element={<Packages />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
      
      {/* Floating WhatsApp Button for all public pages */}
      <WhatsAppButton />
      
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}