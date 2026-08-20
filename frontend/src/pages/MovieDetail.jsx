import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Star, ArrowLeft, Plus, Check, Clock, Calendar, User } from "lucide-react";
import { getMovieById } from "../services/movieService";
import { getWishlist, addToWishlist, removeFromWishlist } from "../services/wishlistService";
import "../styles/movieDetail.scss";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchMovie = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  useEffect(() => {
    const checkWishlist = async () => {
      if (!user) return;
      try {
        const wishlist = await getWishlist();
        setIsInWishlist(wishlist.some((m) => m._id === id));
      } catch (error) {
        console.error(error);
      }
    };
    checkWishlist();
  }, [id, user]);

  const handleToggleWishlist = async () => {
    if (!user) return;
    try {
      if (isInWishlist) {
        await removeFromWishlist(id);
        setIsInWishlist(false);
      } else {
        await addToWishlist(id);
        setIsInWishlist(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <div className="movie-detail-loading">Yuklenir...</div>;
  if (!movie) return <div className="movie-detail-loading">Film tapilmadi</div>;

  return (
    <div className="movie-detail-page">
      <div className="movie-detail-backdrop">
        <img src={movie.poster} alt="" />
        <div className="movie-detail-backdrop-fade"></div>
      </div>

      <Link to="/" className="movie-detail-back">
        <ArrowLeft size={18} /> Geri
      </Link>

      <div className="movie-detail-video-wrapper">
        {movie.trailerUrl ? (
          <iframe
            className="movie-detail-video"
            src={movie.trailerUrl}
            title={movie.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <img className="movie-detail-poster-fallback" src={movie.poster} alt={movie.title} />
        )}
        <div className="movie-detail-video-glow"></div>
      </div>

      <div className="movie-detail-info">
        <div className="movie-detail-header">
          <h1 className="movie-detail-title-anim">{movie.title}</h1>
          <button
            className={`movie-detail-wishlist-btn ${isInWishlist ? "added" : ""}`}
            onClick={handleToggleWishlist}
          >
            {isInWishlist ? <Check size={18} /> : <Plus size={18} />}
            {isInWishlist ? "Wishlist-de" : "Wishlist-e elave et"}
          </button>
        </div>

        <div className="movie-detail-meta">
          <span className="movie-detail-rating">
            <Star size={16} fill="#ffb400" /> {movie.rating}
          </span>
          <span>
            <Calendar size={14} /> {movie.year}
          </span>
          <span>
            <Clock size={14} /> {movie.duration} deq
          </span>
          <span>
            <User size={14} /> {movie.director}
          </span>
        </div>

        <div className="movie-detail-genres">
          {movie.genre?.map((g, i) => (
            <span key={g} className="movie-detail-genre-tag" style={{ animationDelay: `${i * 0.08}s` }}>
              {g}
            </span>
          ))}
        </div>

        <p className="movie-detail-description">{movie.description}</p>

        <div className="movie-detail-rating-bar-wrapper">
          <span className="movie-detail-rating-bar-label">IMDb Score</span>
          <div className="movie-detail-rating-bar-track">
            <div
              className="movie-detail-rating-bar-fill"
              style={{ width: `${(movie.rating / 10) * 100}%` }}
            ></div>
          </div>
          <span className="movie-detail-rating-bar-value">{movie.rating}/10</span>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;