import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Play, ArrowRight } from "lucide-react";
import { getMovies } from "../services/movieService";

const ContinueWatchingSection = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies({
          limit: 6,
          page: 2,
        });

        const withProgress = data.movies.map((movie) => ({
          ...movie,
          progress: Math.floor(Math.random() * 70) + 15,
        }));

        setMovies(withProgress);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  const handleClick = (e, movieId) => {
    e.preventDefault();

    if (!user) {
      navigate("/login", {
        state: {
          redirectTo: `/movie/${movieId}`,
        },
      });

      return;
    }

    navigate(`/movie/${movieId}`);
  };

  if (movies.length === 0) {
    return null;
  }

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
          <a
            key={movie._id}
            href={`/movie/${movie._id}`}
            className="continue-card"
            onClick={(e) => handleClick(e, movie._id)}
          >
            <img
              src={movie.poster}
              alt={movie.title}
            />

            <div className="continue-card-play">
              <Play size={20} fill="#ffffff" />
            </div>

            <span className="continue-card-title">
              {movie.title}
            </span>

            <div className="continue-card-track"></div>

            <div
              className="continue-card-progress"
              style={{
                width: `${movie.progress}%`,
              }}
            ></div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ContinueWatchingSection;