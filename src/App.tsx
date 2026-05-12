import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { AuthProvider } from "./context/AuthContext";
import { NotifProvider } from "./components/Notification";
import CustomCursor from "./components/CustomCursor";
import AnnouncementBar from "./components/AnnouncementBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SuccessPage from "./pages/SuccessPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import SizeGuide from "./pages/SizeGuide";
import HowToApply from "./pages/HowToApply";
import FAQ from "./pages/FAQ";
import Press from "./pages/Press";
import "./index.css";

import PolicyPage from "./pages/PolicyPage";

type Page =
  | "home" | "products" | "detail" | "cart" | "checkout" | "success" | "about" | "contact" | "favorites"
  | "login" | "dashboard" | "size-guide" | "how-to-apply" | "faq" | "press" | "new-arrivals" | "on-sale" | "best-sellers"
  | "blog" | "careers" | "returns" | "shipping" | "privacy" | "terms";

function AppInner() {
  const [page, setPage] = useState<Page>("home");
  const [productId, setProductId] = useState<number>(1);

  const navigate = (newPage: Page, id?: number) => {
    if (id !== undefined) setProductId(id);
    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const showFooter = page !== "checkout" && page !== "success" && page !== "login";

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      
      {/* Hide cursor on mobile later inside component */}
      <CustomCursor />

      {page !== "login" && <AnnouncementBar />}
      {page !== "login" && <Header currentPage={page as any} onNavigate={navigate as any} />}

      {/* Main Content */}
      <main className="flex-grow w-full">
        {page === "home" && <HomePage onNavigate={navigate as any} />}
        {page === "products" && <ProductsPage onNavigate={navigate as any} />}
        {page === "new-arrivals" && <ProductsPage onNavigate={navigate as any} filter="new" />}
        {page === "on-sale" && <ProductsPage onNavigate={navigate as any} filter="sale" />}
        {page === "best-sellers" && <ProductsPage onNavigate={navigate as any} filter="best" />}
        {page === "detail" && (
          <ProductDetailPage
            productId={productId}
            onNavigate={navigate as any}
          />
        )}
        {page === "favorites" && (
          <FavoritesPage onNavigate={navigate as any} />
        )}
        {page === "cart" && <CartPage onNavigate={navigate as any} />}
        {page === "checkout" && (
          <CheckoutPage onNavigate={navigate as any} />
        )}
        {page === "success" && (
          <SuccessPage onNavigate={navigate as any} />
        )}
        {page === "about" && <AboutPage onNavigate={navigate as any} />}
        {page === "contact" && <ContactPage />}
        {page === "login" && <Login onNavigate={navigate as any} />}
        {page === "dashboard" && <Dashboard />}
        {page === "size-guide" && <SizeGuide />}
        {page === "how-to-apply" && <HowToApply />}
        {page === "faq" && <FAQ />}
        {page === "press" && <Press />}
        
        {/* Policy & Info Pages */}
        {page === "blog" && (
          <PolicyPage 
            title="Blog & News" 
            subtitle="Luxury Trends" 
            content="Stay tuned for our upcoming blog featuring nail care tips, the latest Aurora chrome trends, and behind-the-scenes stories from our handcrafted studio in India." 
          />
        )}
        {page === "careers" && (
          <PolicyPage 
            title="Careers" 
            subtitle="Join the Team" 
            content="We are always looking for creative talents to join SR Artémore. If you are passionate about handcrafted luxury and beauty, send your portfolio to careers@srartemore.com." 
          />
        )}
        {page === "returns" && (
          <PolicyPage 
            title="Returns & Refunds" 
            subtitle="Customer Satisfaction" 
            content="Due to the handcrafted and hygienic nature of our products, we accept returns on unused sets within 7 days of delivery if there is a manufacturing defect." 
          />
        )}
        {page === "shipping" && (
          <PolicyPage 
            title="Shipping Policy" 
            subtitle="Delivery Info" 
            content="We offer Pan-India delivery. Every set is handcrafted to order, taking 3-5 business days for production, followed by 2-3 days for shipping." 
          />
        )}
        {page === "privacy" && (
          <PolicyPage 
            title="Privacy Policy" 
            subtitle="Your Data" 
            content="Your privacy is of utmost importance to us. We use luxury-grade encryption to ensure your personal data and payment information are always secure." 
          />
        )}
        {page === "terms" && (
          <PolicyPage 
            title="Terms & Conditions" 
            subtitle="Legal Agreement" 
            content="By using SR Artémore, you agree to our terms of service regarding handcrafted luxury items, custom sizing, and our commitment to quality." 
          />
        )}
      </main>

      {showFooter && <Footer onNavigate={navigate} />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <CartProvider>
          <NotifProvider>
            <AppInner />
          </NotifProvider>
        </CartProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}