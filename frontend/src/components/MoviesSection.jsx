import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import { getMovies } from "../services/movieService";
import { getWishlist, addToWishlist, removeFromWishlist } from "../services/wishlistService";
import MovieCard from "./MovieCard";
import ScrollRow from "./ScrollRow";

const GENRES = ["Drama", "Action", "Adventure", "Romance", "Fantasy", "Comedy", "Animation", "Thriller", "Mystery", "Crime", "Sci-Fi", "Horror"];

const MoviesSection = () => {
  const [movies, setMovies] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [activeGenre, setActiveGenre] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const params = { limit: 12 };
        if (activeGenre) params.genre = activeGenre;
        const data = await getMovies(params);
        setMovies(data.movies);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, [activeGenre]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return;
      try {
        const wishlist = await getWishlist();
        setWishlistIds(wishlist.map((m) => m._id));
      } catch (error) {
        console.error(error);
      }
    };
    fetchWishlist();
  }, [user]);

  const handleToggleWishlist = async (movieId) => {
    if (!user) return;
    try {
      if (wishlistIds.includes(movieId)) {
        await removeFromWishlist(movieId);
        setWishlistIds((prev) => prev.filter((id) => id !== movieId));
      } else {
        await addToWishlist(movieId);
        setWishlistIds((prev) => [...prev, movieId]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">Movies</h2>
        <Link to="/movies" className="section-see-more">
          See More <ArrowRight />
        </Link>
      </div>

      <div className="genre-pills-wrapper">
        <button className={`genre-pill ${!activeGenre ? "active" : ""}`} onClick={() => setActiveGenre(null)}>
          All
        </button>
        {GENRES.map((genre) => (
          <button
            key={genre}
            className={`genre-pill ${activeGenre === genre ? "active" : ""}`}
            onClick={() => setActiveGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      {movies.length === 0 ? (
        <p style={{ color: "var(--text-secondary)" }}>Bu janrda film tapilmadi</p>
      ) : (
        <ScrollRow>
          {movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              isInWishlist={wishlistIds.includes(movie._id)}
              onToggleWishlist={handleToggleWishlist}
            />
          ))}
        </ScrollRow>
      )}
    </section>
  );
};

export default MoviesSection;