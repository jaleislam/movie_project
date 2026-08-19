import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Star, Info } from "lucide-react";
import { getMovies } from "../services/movieService";

const Hero = () => {
  const [movies, setMovies] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

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

  if (movies.length === 0) return null;

  const active = movies[activeIndex];

  return (
    <section className="hero">
      <div className="hero-bg">
        <img className="hero-bg-img" src={active.poster} alt={active.title} />
        <div className="hero-overlay"></div>
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
            <button className="hero-watch-btn" onClick={() => navigate(`/movie/${active._id}`)}>
              <Play size={16} fill="#ffffff" />
              Watch Movie
            </button>
            <button className="hero-info-btn" onClick={() => navigate(`/movie/${active._id}`)}>
              More Info
              <Info size={16} />
            </button>
          </div>
        </div>

        <div className="hero-slider">
          {movies.map((movie, index) => (
            <div
              key={movie._id}
              className={`hero-slide-item ${index === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              <img src={movie.poster} alt={movie.title} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;