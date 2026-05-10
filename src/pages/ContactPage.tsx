import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const socialLinks = [
    { href: "https://instagram.com", icon: "📸", label: "Instagram" },
    { href: "https://facebook.com", icon: "👍", label: "Facebook" },
    { href: "https://youtube.com", icon: "▶️", label: "YouTube" },
    { href: "https://wa.me", icon: "💬", label: "WhatsApp" },
  ];

  return (
    <div>
      <div className="contact-layout">
        <div className="contact-info">
          <h1>Get in<br />Touch</h1>
          <p>Have a question or custom order request? We'd love to hear from you. Reach us through any of the channels below.</p>
          {[
            { icon: "📧", title: "Email", text: "hello@srartemore.com" },
            { icon: "📱", title: "WhatsApp", text: "+91 98765 43210" },
            { icon: "📸", title: "Instagram", text: "@sr_artemore" },
            { icon: "⏰", title: "Response Time", text: "Within 24 hours" },
          ].map(d => (
            <div key={d.title} className="contact-detail">
              <div className="icon">{d.icon}</div>
              <h4>{d.title}</h4>
              <p>{d.text}</p>
            </div>
          ))}
        </div>

        <div className="contact-form-wrap">
          {sent ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ fontSize: "48px", color: "var(--gold)", marginBottom: "20px" }}>✓</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, marginBottom: "12px" }}>Message Sent!</h2>
              <p style={{ color: "var(--text-muted)" }}>We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <>
              <h2>Send a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input required placeholder="Your name" value={form.firstName} onChange={e => set("firstName", e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input required placeholder="Last name" value={form.lastName} onChange={e => set("lastName", e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" required placeholder="your@email.com" value={form.email} onChange={e => set("email", e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input required placeholder="How can we help?" value={form.subject} onChange={e => set("subject", e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    required
                    placeholder="Tell us about your inquiry..."
                    value={form.message}
                    onChange={e => set("message", e.target.value)}
                    style={{ width: "100%", minHeight: "150px", padding: "12px", border: "1px solid var(--border)", fontFamily: "'Jost', sans-serif", resize: "vertical", fontSize: "14px" }}
                  />
                </div>
                <button type="submit" className="form-submit">Send Message</button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Social section */}
      <div style={{ background: "var(--cream)", padding: "60px", textAlign: "center" }}>
        <div className="section-header">
          <p className="section-label">Stay Connected</p>
          <h2 className="section-title">Follow Our World</h2>
        </div>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap", marginTop: "32px" }}>
          {socialLinks.map(sl => (
            <a
              key={sl.label}
              href={sl.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", textDecoration: "none", color: "var(--text)", minWidth: "80px", transition: "transform .2s" }}
              onMouseOver={e => (e.currentTarget.style.transform = "translateY(-4px)")}
              onMouseOut={e => (e.currentTarget.style.transform = "")}
            >
              <div style={{ width: "52px", height: "52px", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", background: "var(--white)" }}>
                {sl.icon}
              </div>
              <span style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}>{sl.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
