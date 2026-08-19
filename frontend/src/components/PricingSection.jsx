const PLANS = [
  { name: "Basic", duration: "3month", price: "$15.140", suggested: false },
  {
    name: "Suggested",
    duration: "6month",
    price: "$22.990",
    oldPrice: "$24.990",
    suggested: true,
  },
  { name: "Premium", duration: "12month", price: "$35.199", suggested: false },
];

const PricingSection = () => {
  return (
    <section className="section pricing-section">
      <div className="section-header">
        <h2 className="section-title">Pricing</h2>
      </div>

      <div className="pricing-cards">
        {PLANS.map((plan) => (
          <div key={plan.name} className={`pricing-card ${plan.suggested ? "suggested" : ""}`}>
            <h3>{plan.name}</h3>
            <p className="pricing-duration">{plan.duration}</p>
            <p className="pricing-price">
              {plan.oldPrice && <span className="pricing-old-price">{plan.oldPrice}</span>}
              {plan.price}
            </p>
            <p className="pricing-note">Cancel anytime</p>
            <button>Continue</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;