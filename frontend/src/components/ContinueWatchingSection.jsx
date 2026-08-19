import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Play, ArrowRight } from "lucide-react";
import { getMovies } from "../services/movieService";

const ContinueWatchingSection = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies({ limit: 6, page: 2 });
        // her filme tesadufi (numune) irelileme faizi elave edirik
        const withProgress = data.movies.map((m) => ({
          ...m,
          progress: Math.floor(Math.random() * 70) + 15,
        }));
        setMovies(withProgress);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, []);

  if (movies.length === 0) return null;

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">Continue watching</h2>
        <Link to="/" className="section-see-more">
          See More <ArrowRight />
        </Link>
      </div>

      <div className="scroll-row">
        {movies.map((movie) => (
          <Link key={movie._id} to={`/movie/${movie._id}`} className="continue-card">
            <img src={movie.poster} alt={movie.title} />
            <div className="continue-card-play">
              <Play size={20} fill="#ffffff" />
            </div>
            <span className="continue-card-title">{movie.title}</span>
            <div className="continue-card-track"></div>
            <div
              className="continue-card-progress"
              style={{ width: `${movie.progress}%` }}
            ></div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ContinueWatchingSection;