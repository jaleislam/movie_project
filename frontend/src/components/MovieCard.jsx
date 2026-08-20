import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Plus, Check } from "lucide-react";

const MovieCard = ({ movie, isInWishlist, onToggleWishlist }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login", { state: { redirectTo: `/movie/${movie._id}` } });
      return;
    }
    navigate(`/movie/${movie._id}`);
  };

  return (
    <a href={`/movie/${movie._id}`} className="movie-card" onClick={handleClick}>
      <button
        className={`movie-card-wishlist-btn ${isInWishlist ? "added" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!user) {
            navigate("/login", { state: { redirectTo: `/movie/${movie._id}` } });
            return;
          }
          onToggleWishlist(movie._id);
        }}
        aria-label="Wishlist-e elave et"
      >
        {isInWishlist ? <Check size={16} /> : <Plus size={16} />}
      </button>

      <img className="movie-card-poster" src={movie.poster} alt={movie.title} />

      <div className="movie-card-overlay">
        <h4>{movie.title}</h4>
      </div>
    </a>
  );
};

export default MovieCard;