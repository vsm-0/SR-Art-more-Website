type Page = "home" | "products" | "about" | "contact" | "cart" | "on-sale"
  | "size-guide" | "how-to-apply" | "faq" | "press";

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="logo-wrap" onClick={() => onNavigate("home")} style={{ marginBottom: "24px", cursor: "pointer", display: "flex", justifyContent: "flex-start" }}>
            <img src="/4.png" alt="SR Artémore" className="footer-logo-img" style={{ width: "220px", height: "auto", display: "block" }} />
          </div>
          <p style={{ textAlign: 'left', fontSize: '14px', lineHeight: '1.8', maxWidth: "300px", color: "var(--text-muted)" }}>
            Handcrafted luxury press-on nails made with love in India. 
            We believe every woman deserves to feel extraordinary, every single day.
          </p>
          <div className="footer-social" style={{ justifyContent: 'flex-start', marginTop: '32px', gap: "15px", display: "flex" }}>
            {[
              { label: "ig", href: "https://instagram.com/sr_artemore" },
              { label: "fb", href: "https://facebook.com/sr_artemore" },
              { label: "▶", href: "https://youtube.com" },
              { label: "P", href: "https://pinterest.com" },
              { label: "wa", href: "https://wa.me" },
            ].map(s => (
              <a key={s.label} href={s.href} className="social-btn" target="_blank" rel="noopener noreferrer" style={{ fontSize: "14px", fontWeight: 500, color: "var(--text)" }}>{s.label}</a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <div className="col-header-wrap" style={{ marginBottom: "20px" }}>
            <h4>Shop</h4>
            <p style={{ fontSize: "10px", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "1px", marginTop: "4px" }}>Handcrafted Luxury</p>
          </div>
          <ul>
            <li><a onClick={() => onNavigate("products")}>All Products</a></li>
            <li><a onClick={() => { localStorage.setItem('selectedShape', 'Long Almond'); onNavigate("products"); }}>Long Almond</a></li>
            <li><a onClick={() => { localStorage.setItem('selectedShape', 'Long Square'); onNavigate("products"); }}>Long Square</a></li>
            <li><a onClick={() => { localStorage.setItem('selectedShape', 'Short Almond'); onNavigate("products"); }}>Short Almond</a></li>
            <li><a onClick={() => { localStorage.setItem('selectedShape', 'Short Square'); onNavigate("products"); }}>Short Square</a></li>
            <li><a onClick={() => onNavigate("products")}>Sale & Offers</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <div className="col-header-wrap" style={{ marginBottom: "20px" }}>
            <h4>Company</h4>
            <p style={{ fontSize: "10px", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "1px", marginTop: "4px" }}>Our Story & Vision</p>
          </div>
          <ul>
            <li><a onClick={() => onNavigate("about")}>About Us</a></li>
            <li><a onClick={() => onNavigate("contact")}>Contact Us</a></li>
            <li><a onClick={() => onNavigate("blog")}>Blog & News</a></li>
            <li><a onClick={() => onNavigate("careers")}>Careers</a></li>
            <li><a onClick={() => onNavigate("press")}>Press & Media</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <div className="col-header-wrap" style={{ marginBottom: "20px" }}>
            <h4>Help</h4>
            <p style={{ fontSize: "10px", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "1px", marginTop: "4px" }}>Customer Care</p>
          </div>
          <ul>
            <li><a onClick={() => onNavigate("size-guide")}>Size Guide</a></li>
            <li><a onClick={() => onNavigate("how-to-apply")}>How to Apply</a></li>
            <li><a onClick={() => onNavigate("returns")}>Returns & Refunds</a></li>
            <li><a onClick={() => onNavigate("shipping")}>Shipping Policy</a></li>
            <li><a onClick={() => onNavigate("privacy")}>Privacy Policy</a></li>
            <li><a onClick={() => onNavigate("terms")}>Terms & Conditions</a></li>
            <li><a onClick={() => onNavigate("faq")}>FAQ</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 SR ARTÉMORE. All rights reserved. Made with ✦ in India.</p>
        <div className="payment-icons">
          <span>VISA</span><span>MC</span><span>UPI</span><span>COD</span><span>PAYTM</span>
        </div>
      </div>
    </footer>
  );
}
