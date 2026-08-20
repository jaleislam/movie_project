import React from "react";
import "../styles/movieSections.scss";

const AwardsBanner = () => {
  return (
    <div className="awards-banner">
      {/* Sol tərəf - Loqo və Heykəl */}
      <div className="awards-banner-brand">
        <div className="awards-banner-logo">
          <h1>GOLDEN</h1>
          <h1>GLOBE</h1>
          <h1 className="awards-text">AWARDS<span>®</span></h1>
        </div>
        <div className="awards-trophy">
          <svg viewBox="0 0 100 240" fill="currentColor">
            {/* Qlobus */}
            <circle cx="50" cy="50" r="35" stroke="#d99f18" strokeWidth="3" />
            <ellipse cx="50" cy="50" rx="35" ry="12" fill="none" stroke="#d99f18" strokeWidth="2" />
            <line x1="50" y1="15" x2="50" y2="85" stroke="#d99f18" strokeWidth="2" />
            {/* Altlıq */}
            <path d="M38 90 L62 90 L56 110 L44 110 Z" />
            <rect x="40" y="110" width="20" height="90" rx="3" />
            <rect x="30" y="200" width="40" height="15" rx="3" />
            <rect x="25" y="215" width="50" height="10" rx="2" />
          </svg>
        </div>
      </div>

      {/* Sağ tərəf - Posterlər */}
      <div className="awards-banner-posters">
        <div className="poster-frame">
          <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=400&q=80" alt="Poster 1" />
        </div>
        <div className="poster-frame">
          <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=400&q=80" alt="Poster 2" />
        </div>
        <div className="poster-frame">
          <img src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=400&q=80" alt="Poster 3" />
        </div>
      </div>

      {/* Mərkəzi şəffaf pill/tag */}
      <div className="awards-banner-tag">
        <span>Watching Golden Globe 2026 Movies</span>
      </div>
    </div>
  );
};

export default AwardsBanner;