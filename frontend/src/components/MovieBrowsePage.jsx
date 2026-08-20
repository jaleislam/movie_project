import { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { getMovies } from "../services/movieService";
import { getWishlist, addToWishlist, removeFromWishlist } from "../services/wishlistService";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

const GENRES = [
  "Drama", "Action", "Adventure", "Romance", "Fantasy", "Comedy",
  "Animation", "Thriller", "Mystery", "Crime", "Sci-Fi", "Horror",
];

const YEARS = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

const MovieBrowsePage = ({ title }) => {
  const [movies, setMovies] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [activeGenre, setActiveGenre] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [year, setYear] = useState("");
  const [director, setDirector] = useState("");
  const [genreScrollIndex, setGenreScrollIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(16);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const params = { limit: visibleCount };
        if (activeGenre) params.genre = activeGenre;
        if (searchText.trim()) params.search = searchText.trim();
        if (year) params.year = year;
        const data = await getMovies(params);
        let filtered = data.movies;
        if (director.trim()) {
          filtered = filtered.filter((m) =>
            m.director.toLowerCase().includes(director.trim().toLowerCase())
          );
        }
        setMovies(filtered);
      } catch (error) {
        console.error(error);
      }
    };
    const timeout = setTimeout(fetchMovies, 250);
    return () => clearTimeout(timeout);
  }, [activeGenre, searchText, year, director, visibleCount]);

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

  const visibleGenres = GENRES.slice(genreScrollIndex, genreScrollIndex + 6);

  return (
    <div className="browse-page">
      <h1 className="browse-page-title">{title}</h1>

      <div className="advance-search-box">
        <div className="advance-search-row">
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">Year</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <div className="advance-search-input">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <input
            type="text"
            className="advance-search-director"
            placeholder="Director"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
          />
        </div>

        <div className="advance-search-genres">
          <button
            className="genre-pill-arrow"
            onClick={() => setGenreScrollIndex(Math.max(0, genreScrollIndex - 1))}
          >
            <ChevronLeft size={16} />
          </button>

          <button
            className={`genre-pill ${!activeGenre ? "active" : ""}`}
            onClick={() => setActiveGenre(null)}
          >
            All
          </button>

          {visibleGenres.map((genre) => (
            <button
              key={genre}
              className={`genre-pill ${activeGenre === genre ? "active" : ""}`}
              onClick={() => setActiveGenre(genre)}
            >
              {genre}
            </button>
          ))}

          <button
            className="genre-pill-arrow"
            onClick={() => setGenreScrollIndex(Math.min(GENRES.length - 6, genreScrollIndex + 1))}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {movies.length === 0 ? (
        <p className="browse-no-results">Netice tapilmadi</p>
      ) : (
        <>
          <div className="browse-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                isInWishlist={wishlistIds.includes(movie._id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>

          {movies.length >= visibleCount && (
            <button className="browse-load-more" onClick={() => setVisibleCount((prev) => prev + 16)}>
              Load More
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default MovieBrowsePage;