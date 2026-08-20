import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Play, Star, Info } from "lucide-react";
import { getMovies } from "../services/movieService";

const Hero = () => {
  const [movies, setMovies] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const heroRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies({ limit: 5, page: 1 });
        setMovies(data.movies);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, []);

  // kursoru izləyən işıq halosu
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--cursor-x", `${x}%`);
      el.style.setProperty("--cursor-y", `${y}%`);
    };

    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, []);

  const handleNavigate = (movieId) => {
    if (!user) {
      navigate("/login", { state: { redirectTo: `/movie/${movieId}` } });
      return;
    }
    navigate(`/movie/${movieId}`);
  };

  if (movies.length === 0) return null;
  const active = movies[activeIndex];

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-bg">
        <img className="hero-bg-img" src={active.poster} alt={active.title} />
        <div className="hero-overlay"></div>
        <div className="hero-wave"></div>
        <div className="hero-cursor-glow"></div>
      </div>

      <div className="hero-content">
        <div className="hero-info">
          <h1 className="hero-title">{active.title}</h1>
          <p className="hero-description">{active.description}</p>

          <div className="hero-meta">
            <div className="hero-stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={15} fill={i < Math.round(active.rating / 2) ? "#ffb400" : "none"} />
              ))}
            </div>
            <span className="hero-rating-badge">IMDb</span>
            <span className="hero-score">{active.rating}</span>
          </div>

          <div className="hero-actions">
            <button className="hero-watch-btn" onClick={() => handleNavigate(active._id)}>
              <Play size={16} fill="#ffffff" />
              Watch Movie
            </button>
            <button className="hero-info-btn" onClick={() => handleNavigate(active._id)}>
              More Info
              <Info size={16} />
            </button>
          </div>
        </div>

        <div className="hero-slider">
          {movies.map((movie, index) => {
            const center = (movies.length - 1) / 2;
            const offset = index - center;
            const angle = offset * 12;
            const liftDown = Math.abs(offset) * 10;

            return (
              <div
                key={movie._id}
                className={`hero-slide-item ${index === activeIndex ? "active" : ""}`}
                style={{
                  zIndex: index === activeIndex ? 50 : movies.length - Math.abs(offset),
                  transform: `rotate(${angle}deg) translateY(${liftDown}px)`,
                }}
                onClick={() => setActiveIndex(index)}
              >
                <img src={movie.poster} alt={movie.title} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;