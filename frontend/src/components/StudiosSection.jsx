const STUDIOS = [
  { name: "HBO", color: "#1a1a1a" },
  { name: "WB", color: "#0f4c81" },
  { name: "Disney+", color: "#0d2340" },
  { name: "Marvel", color: "#ed1d24" },
  { name: "DC", color: "#0078f0" },
  { name: "AMC", color: "#000000" },
  { name: "Netflix", color: "#e50914" },
  { name: "Paramount", color: "#0064ff" },
  { name: "Sony", color: "#000000" },
  { name: "Apple TV+", color: "#000000" },
];

const StudiosSection = () => {
  return (
    <section className="studios-section">
      <h2 className="studios-title">Studios</h2>

      <div className="studios-grid">
        {STUDIOS.map((studio) => (
          <div key={studio.name} className="studio-logo-text" style={{ background: studio.color }}>
            {studio.name}
          </div>
        ))}
      </div>
    </section>
  );
};

export default StudiosSection;