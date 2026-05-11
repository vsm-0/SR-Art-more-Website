import { useState } from "react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useNotif } from "../components/Notification";
import ProductCard from "../components/ProductCard";
import { useFavorites } from "../context/FavoritesContext";

type Page =
  | "home"
  | "products"
  | "detail"
  | "cart"
  | "checkout"
  | "success"
  | "about"
  | "contact"
  | "favorites";

interface ProductDetailProps {
  productId: number;
  onNavigate: (page: Page, productId?: number) => void;
}

// Extended descriptions for all products
const extendedDescriptions: Record<number, string> = {
  1: "This exquisite Diamond Ring is a timeless symbol of elegance and commitment. Expertly crafted with a brilliant-cut diamond set in 18k gold, every facet is designed to capture and reflect light beautifully. The sleek band is polished to a high shine, making it perfect for everyday wear or special occasions. Whether as a gift or a personal treat, this ring embodies luxury that lasts a lifetime. Each piece is individually inspected to meet our highest quality standards before dispatch.",
  2: "This stunning Gold Necklace is handcrafted by our artisans using ethically sourced 22k gold. The intricate link design draws inspiration from classic Italian goldsmithing traditions, updated with a modern sensibility. Lightweight yet substantial, it drapes beautifully against the neckline and pairs effortlessly with both casual and formal attire. Comes presented in our signature gift box, making it an ideal choice for anniversaries, birthdays, or milestone celebrations.",
  3: "Our Pearl Drop Earrings showcase lustrous freshwater pearls, each selected for their exceptional roundness and soft iridescent glow. Set in sterling silver with a secure butterfly clasp, these earrings are as comfortable as they are beautiful. The clean, minimal design allows the natural beauty of the pearl to take centre stage. A versatile piece that transitions seamlessly from a morning meeting to an evening soirée, these earrings are a wardrobe essential.",
  4: "The Sapphire Bracelet features a row of deep blue sapphires set in a delicate sterling silver chain, each stone chosen for its rich, consistent hue. Sapphires are known for their durability and brilliance, making this bracelet both a practical and luxurious accessory. The secure lobster clasp ensures it stays in place throughout the day. Elegant enough for formal events yet understated enough for daily wear, this piece adds a touch of colour and sophistication to any look.",
  5: "This Rose Gold Bangle is forged from premium 18k rose gold, giving it a warm, flattering tone that complements all skin tones. The smooth, polished surface catches the light with every movement, while the solid construction ensures durability. Designed with a subtle open-end style for easy wearability, it can be stacked with other bangles or worn alone for a refined, minimalist look. A truly timeless accessory for the modern woman.",
  6: "Our Emerald Pendant combines a vivid, deep-green natural emerald with a hand-engraved 14k gold setting. The rich colour of the emerald contrasts beautifully with the warm gold, creating a piece that commands attention without being overstated. The pendant hangs from a delicate 18-inch chain, making it ideal for showcasing above a neckline. Emeralds have long been associated with prosperity and vitality — wearing this piece is both a fashion statement and a nod to tradition.",
  7: "The Diamond Tennis Bracelet is a classic of fine jewellery, reimagined for the contemporary collector. A continuous line of round brilliant-cut diamonds is set in a flexible 18k white gold setting, ensuring both security and comfort. Each diamond is GIA-certified and matched for cut, colour, and clarity, resulting in a bracelet that sparkles uniformly from every angle. This is the kind of piece that becomes a signature accessory, worn daily and passed down through generations.",
  8: "These Ruby Stud Earrings feature vibrant, oval-cut rubies encased in a classic four-prong 18k gold setting. The rich red hue of the rubies adds a bold pop of colour to any outfit, making these studs a versatile and impactful choice. The secure push-back fastening ensures all-day comfort. Rubies are one of the rarest and most prized gemstones in the world — owning a pair of these earrings means owning a piece of genuine natural beauty.",
};

// Sample reviews
const sampleReviews = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    date: "12 Apr 2025",
    comment:
      "Absolutely stunning piece. The quality exceeded my expectations — it looks even better in person than in the photos. Arrived beautifully packaged too.",
  },
  {
    id: 2,
    name: "James T.",
    rating: 4,
    date: "28 Mar 2025",
    comment:
      "Bought this as a gift for my wife and she absolutely loves it. Fast delivery, great presentation. Would only give 5 stars if sizing options were wider.",
  },
  {
    id: 3,
    name: "Priya K.",
    rating: 5,
    date: "5 Mar 2025",
    comment:
      "I've purchased from this store three times now and have never been disappointed. This piece is elegant, well-made, and the customer service was excellent.",
  },
];

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          style={{
            fontSize: `${size}px`,
            color: s <= rating ? "var(--gold, #c9a84c)" : "#ddd",
          }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

export default function ProductDetailPage({
  productId,
  onNavigate,
}: ProductDetailProps) {
  const product = products.find((p) => p.id === productId) || products[0];

  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");

  const { addToCart } = useCart();
  const { show } = useNotif();
  const { toggleFavorite, isFavorite } = useFavorites();

  const isFav = isFavorite(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product, selectedSize, "");
    }
    show(`${product.name} added to cart!`);
  };

  const handleWishlist = () => {
    toggleFavorite(product);
    if (!isFav) {
      show(`${product.name} saved to favorites!`);
    }
  };

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const description =
    extendedDescriptions[product.id] ||
    product.description +
    " Crafted with meticulous attention to detail, this piece reflects our commitment to quality and timeless design. Each item is individually inspected before dispatch to ensure it meets our exacting standards. Whether worn daily or reserved for special occasions, it is designed to be treasured for years to come.";

  return (
    <div>
      {/* BREADCRUMB */}
      <div className="page-hero" style={{ padding: "40px 60px" }}>
        <p className="breadcrumb">
          <a onClick={() => onNavigate("home")} style={{ cursor: "pointer", color: "#888" }}>
            Home
          </a>
          {" → "}
          <a onClick={() => onNavigate("products")} style={{ cursor: "pointer", color: "#888" }}>
            Products
          </a>
          {" → "}
          <span>{product.name}</span>
        </p>
      </div>

      <div className="detail-layout">
        {/* IMAGE GALLERY */}
        <div className="img-gallery">
          <div className="thumb-list">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product.name} ${i + 1}`}
                className={`thumb${activeImg === i ? " active" : ""}`}
                onClick={() => setActiveImg(i)}
              />
            ))}
          </div>
          <div className="main-img">
            <img src={product.images[activeImg] || product.image} alt={product.name} />
          </div>
        </div>

        {/* INFO PANEL */}
        <div className="detail-info">
          <p className="detail-label">{product.category}</p>

          {/* Title + heart icon on same row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
            <h1 className="detail-title" style={{ margin: 0, flex: 1 }}>
              {product.name}
            </h1>
            <button
              onClick={handleWishlist}
              aria-label="Add to wishlist"
              style={{
                background: "none",
                border: "1px solid #ddd",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
                marginTop: "6px",
                transition: "border-color 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#e63946";
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#ddd";
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              }}
            >
              <i
                className={isFav ? "ri-heart-3-fill" : "ri-heart-line"}
                style={{ fontSize: "16px", color: isFav ? "#e63946" : "#aaa", transition: "color 0.2s" }}
              />
            </button>
          </div>

          {/* Rating */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "10px", marginBottom: "8px" }}>
            <StarRating rating={Math.round(product.rating)} />
            <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="detail-price">
            £{product.price}
            {product.oldPrice && <span className="old">£{product.oldPrice}</span>}
          </div>

          {/* Size */}
          {product.sizes.length > 0 && (
            <>
              <p className="option-label">
                Size: <strong>{selectedSize}</strong>
              </p>
              <div className="size-options">
                {["XS", "S", "M"].map((s) => (
                  <button
                    key={s}
                    className={`size-btn${selectedSize === s ? " active" : ""}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Description — right after sizes */}
          <p className="product-body-text" style={{
            marginTop: "20px",
            marginBottom: "24px",
            borderTop: "1px solid var(--border)",
            paddingTop: "18px"
          }}>
            {description}
          </p>

          {/* ── SINGLE ROW: qty  |  Buy Now  |  Add To Cart ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "nowrap",
            }}
          >
            <div className="qty-selector-new" style={{ flexShrink: 0 }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <input type="number" value={qty} readOnly />
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>

            <button
              className="btn-buy-now"
              style={{ flex: 1, whiteSpace: "nowrap" }}
              onClick={() => { handleAddToCart(); onNavigate("cart"); }}
            >
              Buy Now
            </button>

            <button
              className="btn-add-cart-new"
              style={{ flex: 1, whiteSpace: "nowrap" }}
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>

          {/* Features */}
          <div className="detail-features" style={{ marginTop: "28px" }}>
            {[
              "100% Handmade — crafted individually in our studio",
              "Reusable up to 10+ wears with proper care",
              "Includes application kit & adhesive tabs",
              "Free shipping on orders above £50",
            ].map((text) => (
              <div key={text} className="feature-row">
                <span className="feature-icon">✦</span>
                <span className="feature-text">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── DESCRIPTION & REVIEWS TABS ── */}
      <div style={{ maxWidth: "900px", margin: "60px auto 0", padding: "0 24px" }}>
        {/* Tab headers */}
        <div
          style={{
            display: "flex",
            borderBottom: "2px solid var(--border, #eee)",
            marginBottom: "32px",
          }}
        >
          {(["description", "reviews"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: "none",
                border: "none",
                borderBottom: activeTab === tab ? "2px solid var(--gold, #c9a84c)" : "2px solid transparent",
                marginBottom: "-2px",
                padding: "12px 28px",
                fontSize: "14px",
                fontWeight: activeTab === tab ? "600" : "400",
                color: activeTab === tab ? "var(--gold, #c9a84c)" : "var(--text-muted, #888)",
                cursor: "pointer",
                textTransform: "capitalize",
                transition: "color 0.2s",
              }}
            >
              {tab === "reviews" ? `Review (${sampleReviews.length})` : "Description"}
            </button>
          ))}
        </div>

        {/* Description tab */}
        {activeTab === "description" && (
          <div className="product-body-text">
            <p>{description}</p>
            <p style={{ marginTop: "16px" }}>
              Our packaging is designed to make gifting effortless — every order arrives in a premium
              branded box with a ribbon closure and a personalised card slot. We use recycled and
              FSC-certified materials throughout to minimise our environmental impact without
              compromising on the unboxing experience.
            </p>
          </div>
        )}

        {/* Reviews tab */}
        {activeTab === "reviews" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {/* Rating summary */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                background: "var(--surface, #fafafa)",
                border: "1px solid var(--border, #eee)",
                borderRadius: "12px",
                padding: "20px 28px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ textAlign: "center", minWidth: "70px" }}>
                <div style={{ fontSize: "42px", fontWeight: "700", lineHeight: 1, color: "var(--text, #111)" }}>
                  {product.rating.toFixed(1)}
                </div>
                <StarRating rating={Math.round(product.rating)} size={16} />
                <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>
                  {product.reviews} reviews
                </div>
              </div>

              <div style={{ flex: 1, minWidth: "160px" }}>
                {[5, 4, 3, 2, 1].map((star) => {
                  const pct = star === 5 ? 68 : star === 4 ? 22 : star === 3 ? 7 : star === 2 ? 2 : 1;
                  return (
                    <div key={star} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
                      <span style={{ fontSize: "12px", width: "14px", color: "var(--text-muted)" }}>{star}</span>
                      <span style={{ fontSize: "11px", color: "var(--gold, #c9a84c)" }}>★</span>
                      <div style={{ flex: 1, height: "6px", background: "#eee", borderRadius: "3px", overflow: "hidden" }}>
                        <div style={{ width: `${pct}%`, height: "100%", background: "var(--gold, #c9a84c)", borderRadius: "3px" }} />
                      </div>
                      <span style={{ fontSize: "12px", color: "var(--text-muted)", width: "32px" }}>{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Individual reviews */}
            {sampleReviews.map((review) => (
              <div key={review.id} style={{ borderBottom: "1px solid var(--border, #eee)", paddingBottom: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px", flexWrap: "wrap", gap: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                        background: "var(--gold, #c9a84c)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: "14px",
                        flexShrink: 0,
                      }}
                    >
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: "600", fontSize: "14px", color: "var(--text)", marginBottom: "2px" }}>
                        {review.name}
                      </div>
                      <StarRating rating={review.rating} size={13} />
                    </div>
                  </div>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{review.date}</span>
                </div>
                <p className="product-body-text" style={{ margin: 0, paddingLeft: "48px" }}>
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <div className="similar-section" style={{ marginTop: "60px" }}>
          <div className="section-header">
            <p className="section-label">You May Also Like</p>
            <h2 className="section-title">Similar Products</h2>
          </div>
          <div className="products-grid related-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      )}

      {/* Responsive: keep actions on one line on mobile */}
      <style>{`
        @media (max-width: 600px) {
          .detail-actions-row {
            flex-wrap: nowrap !important;
          }
          .btn-buy-now,
          .btn-add-cart-new {
            font-size: 12px !important;
            padding: 10px 6px !important;
          }
          .qty-selector-new input {
            width: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}