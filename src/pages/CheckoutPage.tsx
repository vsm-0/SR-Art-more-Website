import { useState } from "react";
import { useCart } from "../context/CartContext";

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

interface CheckoutPageProps {
  onNavigate: (page: Page) => void;
}

export default function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { items, totalPrice, clearCart } = useCart();

  const [step, setStep] = useState(1);
  const [payMethod, setPayMethod] = useState("card");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    cardNum: "",
    cardExp: "",
    cardCvv: "",
  });

  const shipping = totalPrice >= 50 ? 0 : 5;
  const codFee = payMethod === "cod" ? 2 : 0;
  const total = totalPrice + shipping + codFee;

  const set = (k: string, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.firstName || !form.address || !form.email) {
      alert("Please fill required fields");
      return;
    }

    clearCart();
    onNavigate("success");
  };

  return (
    <div className="checkout-layout">
      {/* 🔹 LEFT */}
      <div className="checkout-form">
        <h2>Checkout</h2>

        {/* 🔹 STEPS */}
        <div className="step-indicator">
          <div className={`step${step >= 1 ? " active" : ""}`}>
            <span className="step-num">1</span> Address
          </div>
          <div className={`step${step >= 2 ? " active" : ""}`}>
            <span className="step-num">2</span> Payment
          </div>
          <div className={`step${step >= 3 ? " active" : ""}`}>
            <span className="step-num">3</span> Review
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* 🔹 STEP 1 */}
          {step === 1 && (
            <>
              <div className="form-row">
                <input
                  placeholder="First Name"
                  required
                  value={form.firstName}
                  onChange={(e) => set("firstName", e.target.value)}
                />
                <input
                  placeholder="Last Name"
                  required
                  value={form.lastName}
                  onChange={(e) => set("lastName", e.target.value)}
                />
              </div>

              <input
                type="email"
                placeholder="Email"
                required
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />

              <input
                placeholder="Phone"
                required
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
              />

              <input
                placeholder="Address"
                required
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
              />

              <div className="form-row">
                <input
                  placeholder="City"
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                />
                <input
                  placeholder="State"
                  value={form.state}
                  onChange={(e) => set("state", e.target.value)}
                />
              </div>

              <input
                placeholder="ZIP Code"
                value={form.pincode}
                onChange={(e) => set("pincode", e.target.value)}
              />

              <button
                type="button"
                className="btn-primary"
                onClick={() => setStep(2)}
              >
                Continue
              </button>
            </>
          )}

          {/* 🔹 STEP 2 */}
          {step === 2 && (
            <>
              <div className="payment-methods">
                {["card", "upi", "cod"].map((m) => (
                  <div
                    key={m}
                    className={`pay-method${
                      payMethod === m ? " active" : ""
                    }`}
                    onClick={() => setPayMethod(m)}
                  >
                    {m.toUpperCase()}
                  </div>
                ))}
              </div>

              {payMethod === "card" && (
                <>
                  <input
                    placeholder="Card Number"
                    value={form.cardNum}
                    onChange={(e) => set("cardNum", e.target.value)}
                  />
                  <div className="form-row">
                    <input
                      placeholder="MM/YY"
                      value={form.cardExp}
                      onChange={(e) => set("cardExp", e.target.value)}
                    />
                    <input
                      placeholder="CVV"
                      value={form.cardCvv}
                      onChange={(e) => set("cardCvv", e.target.value)}
                    />
                  </div>
                </>
              )}

              {payMethod === "cod" && (
                <p style={{ fontSize: "13px", color: "gray" }}>
                  Cash on Delivery (+£2 fee)
                </p>
              )}

              <div style={{ display: "flex", gap: "10px" }}>
                <button type="button" onClick={() => setStep(1)}>
                  Back
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setStep(3)}
                >
                  Review
                </button>
              </div>
            </>
          )}

          {/* 🔹 STEP 3 */}
          {step === 3 && (
            <>
              <h3>Order Summary</h3>

              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "13px",
                    padding: "6px 0",
                  }}
                >
                  <span>
                    {item.product.name} × {item.quantity}
                  </span>
                  <span>
                    £{item.product.price * item.quantity}
                  </span>
                </div>
              ))}

              <div style={{ marginTop: "10px" }}>
                <p>Subtotal: £{totalPrice}</p>
                <p>Shipping: {shipping === 0 ? "Free" : `£${shipping}`}</p>
                {codFee > 0 && <p>COD Fee: £{codFee}</p>}
                <h3>Total: £{total}</h3>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button type="button" onClick={() => setStep(2)}>
                  Back
                </button>
                <button type="submit" className="btn-primary">
                  Place Order
                </button>
              </div>
            </>
          )}
        </form>
      </div>

      {/* 🔹 RIGHT SIDEBAR */}
      <div className="checkout-sidebar">
        <h3>Your Order</h3>

        {items.map((item) => (
          <div
            key={`${item.product.id}-${item.size}-${item.color}`}
            className="order-item"
          >
            <img src={item.product.image} alt="" width={60} />
            <div>
              <p>{item.product.name}</p>
              <small>
                {item.quantity} × £{item.product.price}
              </small>
            </div>
          </div>
        ))}

        <div className="summary-row">
          <span>Total</span>
          <span>£{total}</span>
        </div>
      </div>
    </div>
  );
}