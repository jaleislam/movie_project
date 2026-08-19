import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMovies } from "../services/movieService";
import MovieCard from "../components/MovieCard";
import "../styles/collectionPage.scss";

const ALL_GENRES = [
  "Action", "Drama", "Adventure", "Romance", "Fantasy", "Comedy",
  "Animation", "Thriller", "Mystery", "Crime", "Sci-Fi", "Horror",
];

const CollectionPage = () => {
  const [searchParams] = useSearchParams();
  const initialGenre = searchParams.get("genre");
  const [groupedMovies, setGroupedMovies] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      try {
        const results = await Promise.all(
          ALL_GENRES.map((genre) => getMovies({ genre, limit: 10 }))
        );
        const grouped = {};
        ALL_GENRES.forEach((genre, i) => {
          if (results[i].movies.length > 0) {
            grouped[genre] = results[i].movies;
          }
        });
        setGroupedMovies(grouped);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, []);

  useEffect(() => {
    if (initialGenre) {
      setTimeout(() => {
        const el = document.getElementById(`genre-${initialGenre}`);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    }
  }, [initialGenre, groupedMovies]);

  return (
    <div className="collection-page">
      <h1 className="collection-page-title">Collection</h1>

      {isLoading ? (
        <p className="collection-page-loading">Yuklenir...</p>
      ) : (
        Object.entries(groupedMovies).map(([genre, movies]) => (
          <div key={genre} id={`genre-${genre}`} className="collection-page-group">
            <h2 className="collection-page-genre-title">{genre}</h2>
            <div className="collection-page-grid">
              {movies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} isInWishlist={false} onToggleWishlist={() => {}} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CollectionPage;