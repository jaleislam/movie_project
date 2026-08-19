import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { getMovies } from "../services/movieService";

const SearchOverlay = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timeout = setTimeout(async () => {
      try {
        const data = await getMovies({ search: query, limit: 6 });
        setResults(data.movies);
      } catch (error) {
        console.error(error);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const goToMovie = (id) => {
    onClose();
    navigate(`/movie/${id}`);
  };

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-panel" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-row">
          <Search size={20} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Film axtar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {results.length > 0 && (
          <div className="search-results">
            {results.map((movie) => (
              <div key={movie._id} className="search-result-item" onClick={() => goToMovie(movie._id)}>
                <img src={movie.poster} alt={movie.title} />
                <div>
                  <p className="search-result-title">{movie.title}</p>
                  <p className="search-result-meta">{movie.year} · {movie.genre?.join(", ")}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {query.trim() && results.length === 0 && (
          <p className="search-no-results">Netice tapilmadi</p>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;