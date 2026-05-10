import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { useAuth } from "../context/AuthContext";

type Page =
  | "home" | "products" | "detail" | "cart" | "checkout" | "success" | "about" | "contact" | "favorites"
  | "login" | "dashboard" | "size-guide" | "how-to-apply" | "faq" | "press" | "new-arrivals" | "on-sale" | "best-sellers";

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Header({
  currentPage,
  onNavigate,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { totalCount } = useCart();
  const { favorites } = useFavorites();
  const { isAuthenticated, logout } = useAuth();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);

    window.addEventListener("scroll", onScroll);

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { key: "home", label: "Home" },
    { key: "products", label: "Products" },
    { key: "about", label: "About Us" },
    { key: "contact", label: "Contact" },
  ] as const;

  const handleNav = (page: Page) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <div className="nav-inner">

        {/* Logo */}
        <div
          className="logo-wrap"
          onClick={() => handleNav("home")}
        >
          <img src="/3.png" alt="SR Artémore" className="logo-svg" />
        </div>

        {/* Desktop Nav */}
        <ul className="nav-links desktop-menu">
          {navItems.map((item) => (
            <li key={item.key}>
              <a
                onClick={() => handleNav(item.key)}
                className={currentPage === item.key ? "active" : ""}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Icons */}
        <div className="nav-icons">
          <button
            onClick={() => handleNav("favorites")}
            className="icon-btn"
          >
            <i className={favorites.length > 0 ? "ri-heart-3-fill" : "ri-heart-3-line"}></i>
            {favorites.length > 0 && (
              <span className="fav-badge">{favorites.length}</span>
            )}
          </button>

          <button
            onClick={() => handleNav("cart")}
            className={`icon-btn ${currentPage === "cart" ? "active" : ""}`}
          >
            <i className="ri-shopping-cart-fill"></i>
            {totalCount > 0 && (
              <span className="cart-badge">{totalCount}</span>
            )}
          </button>

          {/* Profile Icon - Desktop only */}
          <div className="profile-btn-desktop" style={{ position: "relative" }}>
            <button
              onClick={() => {
                if (isAuthenticated) {
                  setProfileMenuOpen(!profileMenuOpen);
                } else {
                  handleNav("login");
                }
              }}
              className="icon-btn"
            >
              <i className={isAuthenticated ? "ri-user-fill" : "ri-user-line"}></i>
            </button>

            {/* Dropdown Menu */}
            {isAuthenticated && profileMenuOpen && (
              <div
                className="profile-dropdown"
                style={{
                  position: "absolute",
                  top: "120%",
                  right: 0,
                  width: 150,
                  background: "#fff",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                  borderRadius: 4,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  zIndex: 100,
                  border: "1px solid var(--border)"
                }}
              >
                <button
                  onClick={() => { setProfileMenuOpen(false); handleNav("dashboard"); }}
                  className="dropdown-item"
                  style={{ width: "100%", padding: "12px", textAlign: "left", fontSize: "13px", fontFamily: "Jost", background: "none", border: "none", borderBottom: "1px solid var(--border)", cursor: "pointer", color: "#111" }}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => { setProfileMenuOpen(false); logout(); handleNav("home"); }}
                  className="dropdown-item logout"
                  style={{ width: "100%", padding: "12px", textAlign: "left", fontSize: "13px", fontFamily: "Jost", background: "none", border: "none", cursor: "pointer", color: "#c0392b" }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="menu-toggle icon-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <a
              key={item.key}
              onClick={() =>
                handleNav(item.key)
              }
              className={
                currentPage === item.key
                  ? "active"
                  : ""
              }
            >
              {item.label}
            </a>
          ))}
          
          {/* Account inside mobile menu */}
          <div className="mobile-menu-divider"></div>
          {isAuthenticated ? (
            <>
              <a onClick={() => handleNav("dashboard")} className={currentPage === "dashboard" ? "active" : ""}>
                Dashboard
              </a>
              <a onClick={() => { logout(); handleNav("home"); }}>
                Logout
              </a>
            </>
          ) : (
            <a onClick={() => handleNav("login")} className={currentPage === "login" ? "active" : ""}>
              Login / Register
            </a>
          )}
        </div>
      )}
    </nav>
  );
}