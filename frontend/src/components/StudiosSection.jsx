const STUDIOS = [
  "hbo", "wb", "disney", "marvel", "dc", "amc", "netflix", "paramount", "sony", "appletv",
];

const StudiosSection = () => {
  return (
    <section className="studios-section">
      <h2 className="studios-title">Studios</h2>

      <div className="studios-grid">
        {STUDIOS.map((studio) => (
          <div key={studio} className="studio-logo">
            <img src={`/images/studios/${studio}.png`} alt={studio} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default StudiosSection;