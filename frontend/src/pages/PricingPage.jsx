import { Check } from "lucide-react";
import "../styles/pricingPage.scss";

const PLANS = [
  { name: "Basic", duration: "3 month", price: "$15.140", features: ["HD Streaming", "1 Screen", "Cancel anytime"] },
  {
    name: "Suggested",
    duration: "6 month",
    price: "$22.990",
    oldPrice: "$24.990",
    suggested: true,
    features: ["Full HD Streaming", "2 Screens", "Offline Download", "Cancel anytime"],
  },
  { name: "Premium", duration: "12 month", price: "$35.199", features: ["4K Streaming", "4 Screens", "Offline Download", "Priority Support", "Cancel anytime"] },
];

const PricingPage = () => {
  return (
    <div className="pricing-page">
      <h1 className="pricing-page-title">Choose Your Plan</h1>
      <p className="pricing-page-subtitle">
        Unlimited movies and series. Cancel anytime.
      </p>

      <div className="pricing-cards">
        {PLANS.map((plan) => (
          <div key={plan.name} className={`pricing-card ${plan.suggested ? "suggested" : ""}`}>
            <h3>{plan.name}</h3>
            <p className="pricing-duration">{plan.duration}</p>
            <p className="pricing-price">
              {plan.oldPrice && <span className="pricing-old-price">{plan.oldPrice}</span>}
              {plan.price}
            </p>

            <ul className="pricing-features">
              {plan.features.map((f) => (
                <li key={f}>
                  <Check size={15} /> {f}
                </li>
              ))}
            </ul>

            <button>Continue</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;