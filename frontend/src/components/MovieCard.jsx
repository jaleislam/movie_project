import { Plus, Check } from "lucide-react";

const MovieCard = ({ movie, isInWishlist, onToggleWishlist }) => {
  return (
    <div className="movie-card">
      <button
        className={`movie-card-wishlist-btn ${isInWishlist ? "added" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
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
    </div>
  );
};

export default MovieCard;