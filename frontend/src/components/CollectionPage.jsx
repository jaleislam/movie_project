import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getMovies } from "../services/movieService";
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
          ALL_GENRES.map((genre) => getMovies({ genre, limit: 8 }))
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
        document.getElementById(`genre-${initialGenre}`)?.scrollIntoView({ behavior: "smooth" });
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
            <div className="collection-row">
              {movies.map((movie) => (
                <Link key={movie._id} to={`/movie/${movie._id}`} className="collection-card">
                  <img src={movie.poster} alt={movie.title} />
                  <div className="collection-card-label">{movie.title}</div>
                </Link>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CollectionPage;