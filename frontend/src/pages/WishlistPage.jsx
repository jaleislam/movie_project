import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Play, Star, Trash2, Clock, Calendar } from "lucide-react";
import { getWishlist, addToWishlist, removeFromWishlist } from "../services/wishlistService";
import { getMovies } from "../services/movieService";
import MovieCard from "../components/MovieCard";
import "../styles/wishlistPage.scss";

const PAGE_SIZE = 3;

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const wishlistData = await getWishlist();
      setWishlist(wishlistData);

      const wishlistIds = wishlistData.map((m) => m._id);
      const allMovies = await getMovies({ limit: 30 });
      const suggestions = allMovies.movies
        .filter((m) => !wishlistIds.includes(m._id))
        .sort(() => 0.5 - Math.random())
        .slice(0, 12);
      setRecommended(suggestions);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { redirectTo: "/wishlist" } });
      return;
    }
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  const handleRemove = async (movieId) => {
    try {
      await removeFromWishlist(movieId);
      setWishlist((prev) => prev.filter((m) => m._id !== movieId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRecommendedToggle = async (movieId) => {
    try {
      await addToWishlist(movieId);
      const addedMovie = recommended.find((m) => m._id === movieId);
      if (addedMovie) {
        setWishlist((prev) => [...prev, addedMovie]);
        setRecommended((prev) => prev.filter((m) => m._id !== movieId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <div className="wishlist-loading">Yuklenir...</div>;

  const visibleWishlist = wishlist.slice(0, visibleCount);

  return (
    <div className="wishlist-page">
      <h1 className="wishlist-page-title">Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          <p>Wishlist-in bosdur.</p>
          <Link to="/movies" className="wishlist-empty-btn">
            Filmlere bax
          </Link>
        </div>
      ) : (
        <>
          <div className="wishlist-list">
            {visibleWishlist.map((movie) => (
              <div key={movie._id} className="wishlist-item">
                <div className="wishlist-item-poster">
                  <img src={movie.poster} alt={movie.title} />
                </div>

                <div className="wishlist-item-info">
                  <div className="wishlist-item-header">
                    <h3>{movie.title}</h3>
                    <button
                      className="wishlist-item-remove"
                      onClick={() => handleRemove(movie._id)}
                      aria-label="Wishlist-den sil"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>

                  <div className="wishlist-item-meta">
                    <span>
                      <Star size={14} fill="#ffb400" /> {movie.rating}
                    </span>
                    <span>
                      <Calendar size={14} /> {movie.year}
                    </span>
                    <span>
                      <Clock size={14} /> {movie.duration} deq
                    </span>
                  </div>

                  <div className="wishlist-item-genres">
                    {movie.genre?.map((g) => (
                      <span key={g} className="wishlist-item-genre-tag">
                        {g}
                      </span>
                    ))}
                  </div>

                  <p className="wishlist-item-description">{movie.description}</p>

                  <button
                    className="wishlist-item-watch-btn"
                    onClick={() => navigate(`/movie/${movie._id}`)}
                  >
                    <Play size={16} fill="#ffffff" />
                    Watch Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {wishlist.length > visibleCount && (
            <button
              className="wishlist-load-more"
              onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
            >
              Load More
            </button>
          )}
        </>
      )}

      {recommended.length > 0 && (
        <div className="wishlist-recommended">
          <h2 className="wishlist-recommended-title">Tovsiye edilen filmler</h2>
          <div className="wishlist-recommended-grid">
            {recommended.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                isInWishlist={false}
                onToggleWishlist={handleRecommendedToggle}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;