const AwardsBanner = () => {
  return (
    <div className="awards-banner">
      <div className="awards-banner-content">
        <h2 className="awards-banner-title">
          GOLDEN
          <br />
          GLOBE
          <br />
          AWARDS
        </h2>
        <span className="awards-banner-tag">Watching Golden Globe 2024 Movies</span>
      </div>

      <div className="awards-banner-posters">
        <img src="/images/awards/poster1.jpg" alt="" />
        <img src="/images/awards/poster2.jpg" alt="" />
        <img src="/images/awards/poster3.jpg" alt="" />
      </div>
    </div>
  );
};

export default AwardsBanner;