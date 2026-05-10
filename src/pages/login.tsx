import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

// ─────────────────────────────────────────────────────────────────
// SR Artémore — Auth Pages  |  Brand gold #b8975a / charcoal #0d0c0a
// ─────────────────────────────────────────────────────────────────

const GOOGLE_ICON = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const STAR = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#b8975a">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const ARROW_LEFT = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6"/>
  </svg>
);
const ARROW_RIGHT = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6"/>
  </svg>
);

// ── SR Artémore SVG Logo ──────────────────────────────────────────────────────
// Faithfully recreated: notched-corner frame, SR serif, floral sprig, ® mark, ARTÉMORE wordmark
function ArtemLogo({ size = 72, color = "#b8975a", showWordmark = true, horizontal = false }) {
  const s = size;
  // frame stroke proportional to size
  const sw = Math.max(1, s * 0.025);

  const emblem = (
    <img src="/4.png" alt="Logo" style={{ width: s, height: s, objectFit: 'contain' }} />
  );

  if (!showWordmark) return emblem;

  if (horizontal) {
    // Horizontal: [emblem] [ARTÉMORE]
    const fontSize = s * 0.56;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: s * 0.22 }}>
        {emblem}
        <span style={{
          fontFamily: "'Cormorant Garamond', 'Georgia', serif",
          fontSize, fontWeight: 400,
          color,
          letterSpacing: "0.06em",
          lineHeight: 1,
          whiteSpace: "nowrap",
          userSelect: "none",
        }}>
          ART&#201;MORE
        </span>
      </div>
    );
  }

  // Stacked: emblem above, ARTÉMORE below
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: s * 0.12 }}>
      {emblem}
      <span style={{
        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
        fontSize: s * 0.22,
        fontWeight: 400,
        color,
        letterSpacing: "0.35em",
        paddingLeft: "0.35em",
        lineHeight: 1,
        userSelect: "none",
      }}>
        ART&#201;MORE
      </span>
    </div>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { quote: "SR Artémore nails made my henna look professional and complete — truly a game changer for my clients.", name: "Priya Sharma", role: "Henna Artist", company: "Mehndi Studio Delhi" },
  { quote: "The quality is exceptional. Each set is handcrafted with such precision — I've never seen anything like it.", name: "Aisha Khan", role: "Bridal Stylist", company: "Luxury Bridal Co." },
  { quote: "I booked the Mystic Emerald set and it lasted over 10 wears. I'm completely obsessed.", name: "Divya Menon", role: "Beauty Influencer", company: "@divyabeauty" },
];

// ── Responsive hook ───────────────────────────────────────────────────────────
function useBreakpoint() {
  const [bp, setBp] = useState("desktop");
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w < 640) setBp("phone");
      else if (w < 1024) setBp("tablet");
      else setBp("desktop");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return bp;
}

// ── Desktop image panel ───────────────────────────────────────────────────────
function DesktopImagePanel() {
  const [idx, setIdx] = useState(0);
  const t = TESTIMONIALS[idx];
  return (
    <div style={{ width: "46%", minHeight: "100vh", position: "relative", flexShrink: 0, overflow: "hidden", borderRadius: "0 16px 16px 0" }}>
      <img src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=900&q=80&fit=crop"
        alt="SR Artémore luxury nails"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(13,12,10,0.18) 0%, rgba(13,12,10,0.0) 35%, rgba(13,12,10,0.7) 72%, rgba(13,12,10,0.88) 100%)" }} />

      {/* Logo top-left on panel */}
      <div style={{ position: "absolute", top: 28, left: 28, zIndex: 10 }}>
        <ArtemLogo size={120} color="rgba(245,240,232,0.92)" showWordmark={false} />
      </div>

      {/* Testimonial card */}
      <div style={{
        position: "absolute", bottom: 32, left: 20, right: 20, zIndex: 10,
        background: "rgba(255,253,248,0.13)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.2)", borderRadius: 14, padding: "22px 22px 18px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.18)",
      }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontWeight: 500, color: "#ffffff", lineHeight: 1.55, marginBottom: 16, fontStyle: "italic" }}>
          "{t.quote}"
        </p>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 10 }}>
          <div>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 13, fontWeight: 600, color: "#ffffff", marginBottom: 3 }}>{t.name}</p>
            <div style={{ display: "flex", gap: 2, marginBottom: 4 }}>{[...Array(5)].map((_, i) => <STAR key={i} />)}</div>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, color: "rgba(245,240,232,0.6)", letterSpacing: "0.05em" }}>{t.role}</p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, color: "rgba(184,151,90,0.85)", marginTop: 1 }}>{t.company}</p>
          </div>
          <div style={{ display: "flex", gap: 7, flexShrink: 0 }}>
            {[{ fn: () => setIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length), Icon: ARROW_LEFT },
              { fn: () => setIdx(i => (i + 1) % TESTIMONIALS.length), Icon: ARROW_RIGHT }].map(({ fn, Icon }, i) => (
              <button key={i} onClick={fn} style={{
                width: 32, height: 32, borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(184,151,90,0.4)"; e.currentTarget.style.borderColor = "#b8975a"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
              >
                <Icon />
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 5, marginTop: 12 }}>
          {TESTIMONIALS.map((_, i) => (
            <div key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 18 : 6, height: 6, borderRadius: 3, background: i === idx ? "#b8975a" : "rgba(255,255,255,0.35)", transition: "all 0.3s", cursor: "pointer" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Tablet Banner ─────────────────────────────────────────────────────────────
function TabletBanner({ mode }) {
  return (
    <div style={{
      background: "linear-gradient(160deg, #0d0c0a 0%, #1a1814 60%, #211e18 100%)",
      padding: "20px 28px", display: "flex", alignItems: "center", justifyContent: "space-between",
      borderBottom: "1px solid rgba(184,151,90,0.15)", gap: 20, position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", width: 240, height: 240, borderRadius: "50%", border: "1px solid rgba(184,151,90,0.06)", top: "50%", right: 24, transform: "translateY(-50%)", pointerEvents: "none" }} />
      {/* Horizontal logo */}
      <ArtemLogo size={120} color="#b8975a" horizontal showWordmark={false} />
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontStyle: "italic", color: "#f5f0e8", fontWeight: 300, lineHeight: 1.3, flex: 1, textAlign: "center" }}>
        {mode === "login" ? "Wear Art on Your Fingertips." : "Handcrafted Luxury, Crafted for You."}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 5, flexShrink: 0 }}>
        {["Handmade", "10+ Wears", "Free Ship ₹999+"].map(t => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 3, height: 3, borderRadius: "50%", background: "#b8975a" }} />
            <span style={{ color: "rgba(245,240,232,0.45)", fontSize: 9, fontFamily: "'Jost', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Phone top bar ─────────────────────────────────────────────────────────────
function PhoneTopBar() {
  return (
    <div style={{
      background: "linear-gradient(135deg, #0d0c0a 0%, #1a1814 100%)",
      padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
      borderBottom: "1px solid rgba(184,151,90,0.2)",
    }}>
      <ArtemLogo size={100} color="#b8975a" horizontal showWordmark={false} />
      <span style={{ color: "rgba(184,151,90,0.6)", fontFamily: "'Jost', sans-serif", fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase" }}>Luxury Nails</span>
    </div>
  );
}

// ── Phone Image Banner (shows hero image on mobile login) ─────────────────────
function PhoneImageBanner() {
  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "200px",
      overflow: "hidden",
      flexShrink: 0,
    }}>
      <img
        src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=900&q=80&fit=crop"
        alt="SR Artémore luxury nails"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
        }}
      />
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to bottom, rgba(13,12,10,0.1) 0%, rgba(13,12,10,0.6) 100%)",
      }} />
      <div style={{
        position: "absolute",
        bottom: 16,
        left: 20,
        right: 20,
        zIndex: 10,
      }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 20,
          fontStyle: "italic",
          fontWeight: 300,
          color: "#fff",
          lineHeight: 1.3,
          textShadow: "0 1px 4px rgba(0,0,0,0.3)",
        }}>
          Wear Art on Your Fingertips.
        </p>
      </div>
    </div>
  );
}

// ── Card logo (stacked, centered) inside form card ────────────────────────────
function CardLogo({ bp }: any) {
  const size = bp === "phone" ? 140 : bp === "tablet" ? 180 : 200;
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: bp === "phone" ? 20 : 26 }}>
      <ArtemLogo size={size} color="#b8975a" showWordmark={false} horizontal={false} />
    </div>
  );
}

// ── Input ─────────────────────────────────────────────────────────────────────
function Input({ label, type = "text", placeholder, value, onChange, required, bp }) {
  const [focused, setFocused] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const isPw = type === "password";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#6b6358", fontWeight: 500 }}>
        {label}{required && <span style={{ color: "#b8975a", marginLeft: 2 }}>*</span>}
      </label>
      <div style={{ position: "relative" }}>
        <input
          type={isPw && showPw ? "text" : type}
          placeholder={placeholder} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} required={required}
          style={{
            background: focused ? "#faf7f2" : "#f0ebe2",
            border: `1px solid ${focused ? "#b8975a" : "#ddd4c5"}`, borderRadius: 2,
            padding: bp === "phone" ? "14px 40px 14px 14px" : "11px 36px 11px 14px",
            fontFamily: "'Jost', sans-serif", fontSize: bp === "phone" ? 15 : 13,
            color: "#1a1814", outline: "none", transition: "all 0.2s",
            boxShadow: focused ? "0 0 0 3px rgba(184,151,90,0.1)" : "none",
            width: "100%", WebkitAppearance: "none", appearance: "none",
          }}
        />
        {isPw && (
          <button type="button" onClick={() => setShowPw(s => !s)} style={{
            position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
            background: "none", border: "none", cursor: "pointer", color: "#a09585", padding: 0, display: "flex", alignItems: "center",
          }}>
            {showPw
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            }
          </button>
        )}
      </div>
    </div>
  );
}

// ── Gold Button ───────────────────────────────────────────────────────────────
function GoldButton({ children, type = "button", bp }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button type={type}
      onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)} onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setTimeout(() => setPressed(false), 120)}
      style={{
        width: "100%", padding: bp === "phone" ? "16px 28px" : "13px 28px",
        background: pressed ? "linear-gradient(180deg, #9a7238 0%, #c9a55a 100%)" : "linear-gradient(180deg, #c9a55a 0%, #9a7238 100%)",
        border: "none", borderRadius: 2, fontFamily: "'Jost', sans-serif",
        fontSize: bp === "phone" ? 12 : 11, letterSpacing: "0.22em", textTransform: "uppercase",
        color: "#0d0c0a", fontWeight: 700, cursor: "pointer", transition: "all 0.14s",
        boxShadow: pressed ? "0 1px 3px rgba(0,0,0,0.3), inset 0 2px 5px rgba(0,0,0,0.15)" : "0 5px 18px rgba(184,151,90,0.42), 0 2px 5px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.3)",
        transform: pressed ? "translateY(2px)" : "translateY(0)", WebkitTapHighlightColor: "transparent",
      }}>{children}</button>
  );
}

// ── Ghost Button ──────────────────────────────────────────────────────────────
function GhostButton({ children, bp }) {
  const [hov, setHov] = useState(false);
  return (
    <button type="button" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width: "100%", padding: bp === "phone" ? "14px 20px" : "11px 20px",
        background: hov ? "rgba(184,151,90,0.07)" : "transparent",
        border: `1px solid ${hov ? "#b8975a" : "#ddd4c5"}`, borderRadius: 2,
        fontFamily: "'Jost', sans-serif", fontSize: bp === "phone" ? 13 : 12,
        letterSpacing: "0.07em", color: "#3a3530", cursor: "pointer", transition: "all 0.2s",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
        WebkitTapHighlightColor: "transparent",
      }}>{children}</button>
  );
}

function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ flex: 1, height: 1, background: "#e0d5c5" }} />
      <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "#b0a898" }}>or</span>
      <div style={{ flex: 1, height: 1, background: "#e0d5c5" }} />
    </div>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────
function Card({ children, bp }) {
  const isPhone = bp === "phone";
  return (
    <div style={{
      background: isPhone ? "#fdfaf6" : "rgba(255,253,249,0.96)",
      backdropFilter: isPhone ? "none" : "blur(24px)", WebkitBackdropFilter: isPhone ? "none" : "blur(24px)",
      borderRadius: isPhone ? 0 : 4,
      border: isPhone ? "none" : "1px solid rgba(224,213,197,0.85)",
      boxShadow: isPhone ? "none" : "0 24px 64px rgba(0,0,0,0.1), 0 8px 20px rgba(0,0,0,0.06)",
      padding: isPhone ? "28px 20px 48px" : bp === "tablet" ? "38px 42px" : "44px 48px",
      width: "100%", maxWidth: isPhone ? "100%" : bp === "tablet" ? 480 : 420,
      position: "relative", overflow: "hidden",
    }}>
      {!isPhone && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(184,151,90,0.55), transparent)" }} />}
      {children}
    </div>
  );
}

function Heading({ title, sub, bp }) {
  return (
    <div style={{ textAlign: "center", marginBottom: bp === "phone" ? 18 : 24 }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: bp === "phone" ? 28 : 30, fontWeight: 400, color: "#1a1814", letterSpacing: "-0.01em", marginBottom: 5 }}>{title}</h1>
      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, color: "#8a7f72", letterSpacing: "0.05em" }}>{sub}</p>
    </div>
  );
}

function SwitchLink({ text, linkText, onClick }) {
  return (
    <p style={{ textAlign: "center", fontFamily: "'Jost', sans-serif", fontSize: 12, color: "#8a7f72", marginTop: 2 }}>
      {text}{" "}
      <button onClick={onClick} style={{ background: "none", border: "none", color: "#b8975a", cursor: "pointer", fontFamily: "'Jost', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", padding: 0, textDecoration: "underline", textUnderlineOffset: 3, WebkitTapHighlightColor: "transparent" }}>{linkText}</button>
    </p>
  );
}

// ── Checkbox ──────────────────────────────────────────────────────────────────
function Checkbox({ checked, onChange }) {
  return (
    <div onClick={onChange} style={{
      flexShrink: 0, width: 16, height: 16,
      border: `1.5px solid ${checked ? "#b8975a" : "#c4baa8"}`,
      background: checked ? "#b8975a" : "transparent",
      borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center",
      transition: "all 0.15s", cursor: "pointer",
    }}>
      {checked && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="#0d0c0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </div>
  );
}

// ── Form shell background ─────────────────────────────────────────────────────
function FormShell({ children, bp }) {
  const isPhone = bp === "phone";
  return (
    <div style={{
      flex: 1, display: "flex", alignItems: isPhone ? "flex-start" : "center", justifyContent: "center",
      padding: isPhone ? 0 : bp === "tablet" ? "36px 24px" : "40px",
      background: "linear-gradient(135deg, #f5f0e8 0%, #ede6d9 100%)",
      position: "relative", overflow: isPhone ? "visible" : "hidden",
      minHeight: isPhone || bp === "tablet" ? "auto" : "100vh",
    }}>
      {!isPhone && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.14, backgroundImage: "radial-gradient(circle, #b8975a 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      )}
      {children}
    </div>
  );
}

// ── LOGIN ─────────────────────────────────────────────────────────────────────
function LoginForm({ bp, onSwitch, onNavigate }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    login();
    if (onNavigate) onNavigate("dashboard");
  };

  return (
    <Card bp={bp}>
      <CardLogo bp={bp} />
      <Heading title="Welcome Back" sub="Login to your account" bp={bp} />
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: bp === "phone" ? 16 : 13 }}>
        <Input label="Email Address" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required bp={bp} />
        <div>
          <Input label="Password" type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required bp={bp} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer" }}>
              <Checkbox checked={remember} onChange={() => setRemember(r => !r)} />
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, color: "#8a7f72" }}>Remember me</span>
            </label>
            <button style={{ background: "none", border: "none", fontFamily: "'Jost', sans-serif", fontSize: 11, color: "#b8975a", cursor: "pointer", padding: 0, textDecoration: "underline", textUnderlineOffset: 3 }}>Forgot password</button>
          </div>
        </div>
        <div style={{ marginTop: 4 }}><GoldButton type="submit" bp={bp}>Sign In</GoldButton></div>
        <GhostButton bp={bp}>{GOOGLE_ICON}<span>Sign in with Google</span></GhostButton>
        <SwitchLink text="Don't have an account?" linkText="Sign up for free" onClick={onSwitch} />
      </form>
    </Card>
  );
}

// ── SIGNUP ────────────────────────────────────────────────────────────────────
function SignUpForm({ bp, onSwitch, onNavigate }: any) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [agreed, setAgreed] = useState(false);
  const { login } = useAuth();
  
  const upd = (f: string) => (e: any) => setForm(p => ({ ...p, [f]: e.target.value }));
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    login();
    if (onNavigate) onNavigate("dashboard");
  };

  return (
    <Card bp={bp}>
      <CardLogo bp={bp} />
      <Heading title="Create Account" sub="Get started with SR Artémore" bp={bp} />
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: bp === "phone" ? 14 : 12 }}>
        <GhostButton bp={bp}>{GOOGLE_ICON}<span>Continue with Google</span></GhostButton>
        <Divider />
        <Input label="Full Name" placeholder="Your full name" value={form.name} onChange={upd("name")} required bp={bp} />
        <Input label="Email Address" type="email" placeholder="you@example.com" value={form.email} onChange={upd("email")} required bp={bp} />
        {bp !== "phone" ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Input label="Password" type="password" placeholder="Create password" value={form.password} onChange={upd("password")} required bp={bp} />
            <Input label="Confirm" type="password" placeholder="Repeat password" value={form.confirm} onChange={upd("confirm")} required bp={bp} />
          </div>
        ) : (
          <>
            <Input label="Password" type="password" placeholder="Create a password" value={form.password} onChange={upd("password")} required bp={bp} />
            <Input label="Confirm Password" type="password" placeholder="Repeat your password" value={form.confirm} onChange={upd("confirm")} required bp={bp} />
          </>
        )}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginTop: 2 }}>
          <Checkbox checked={agreed} onChange={() => setAgreed(!agreed)} />
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, color: "#8a7f72", lineHeight: 1.6, marginTop: 1 }}>
            I agree to the <span style={{ color: "#b8975a", textDecoration: "underline", cursor: "pointer" }}>Terms of Service</span> and <span style={{ color: "#b8975a", textDecoration: "underline", cursor: "pointer" }}>Privacy Policy</span>
          </span>
        </div>
        <div style={{ marginTop: 2 }}><GoldButton type="submit" bp={bp}>Create Account</GoldButton></div>
        <SwitchLink text="Already have an account?" linkText="Login" onClick={onSwitch} />
      </form>
    </Card>
  );
}

// ── Tablet layout ─────────────────────────────────────────────────────────────
function TabletLayout({ page, onSwitch, onNavigate }: any) {
  return (
    <div style={{ minHeight: "100vh", background: "#ede6d9", display: "flex", flexDirection: "column" }}>
      <TabletBanner mode={page} />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "36px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.13, backgroundImage: "radial-gradient(circle, #b8975a 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        {page === "login" ? <LoginForm bp="tablet" onSwitch={onSwitch} onNavigate={onNavigate} /> : <SignUpForm bp="tablet" onSwitch={onSwitch} onNavigate={onNavigate} />}
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function AuthApp({ onNavigate }: any) {
  const [page, setPage] = useState("login");
  const bp = useBreakpoint();
  const toggle = () => setPage(p => p === "login" ? "signup" : "login");

  if (bp === "tablet") return (
    <>
      <GlobalStyles />
      <div key={page} className="auth-enter"><TabletLayout page={page} onSwitch={toggle} onNavigate={onNavigate} /></div>
    </>
  );

  if (bp === "phone") return (
    <>
      <GlobalStyles />
      <div key={page} className="auth-enter" style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#f5f0e8" }}>
        <PhoneTopBar />
        <PhoneImageBanner />
        <div style={{ flex: 1, padding: "0" }}>
          {page === "login" ? <LoginForm bp="phone" onSwitch={toggle} onNavigate={onNavigate} /> : <SignUpForm bp="phone" onSwitch={toggle} onNavigate={onNavigate} />}
        </div>
      </div>
    </>
  );

  // Desktop
  return (
    <>
      <GlobalStyles />
      <div key={page} className="auth-enter" style={{ display: "flex", minHeight: "100vh" }}>
        <FormShell bp="desktop">
          {page === "login" ? <LoginForm bp="desktop" onSwitch={toggle} onNavigate={onNavigate} /> : <SignUpForm bp="desktop" onSwitch={toggle} onNavigate={onNavigate} />}
        </FormShell>
        <DesktopImagePanel />
      </div>
    </>
  );
}

// ── Global styles ─────────────────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; overflow-x: hidden; }
      input { -webkit-appearance: none; appearance: none; }
      input::placeholder { color: #bdb4a6; }
      input:focus { outline: none; }
      button { -webkit-tap-highlight-color: transparent; }
      .auth-enter { animation: authFade 0.32s ease both; }
      @keyframes authFade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
      @media (max-width: 639px) { body { overflow-y: auto; background: #f5f0e8; } }
      @media (min-width: 640px) and (max-width: 1023px) { body { overflow-y: auto; background: #ede6d9; } }
    `}</style>
  );
}
