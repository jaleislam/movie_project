import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getMovies } from "../services/movieService";
import "../styles/collectionPage.scss";
import "../styles/extraSections.scss";

const ALL_GENRES = [
  "Action",
  "Drama",
  "Adventure",
  "Romance",
  "Fantasy",
  "Comedy",
  "Animation",
  "Thriller",
  "Mystery",
  "Crime",
  "Sci-Fi",
  "Horror",
];

const CollectionPage = () => {
  const [searchParams] = useSearchParams();
  const initialGenre = searchParams.get("genre");

  const [groupedMovies, setGroupedMovies] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);

      try {
        const results = await Promise.all(
          ALL_GENRES.map((genre) =>
            getMovies({
              genre,
              limit: 8,
            })
          )
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
        document
          .getElementById(`genre-${initialGenre}`)
          ?.scrollIntoView({
            behavior: "smooth",
          });
      }, 400);
    }
  }, [initialGenre, groupedMovies]);

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

  return (
    <div className="collection-page">
      {isLoading ? (
        <p className="collection-page-loading">Yuklenir...</p>
      ) : (
        Object.entries(groupedMovies).map(([genre, movies]) => (
          <div
            key={genre}
            id={`genre-${genre}`}
            className="collection-page-group"
          >
            <h2 className="collection-page-genre-title">
              {genre}
            </h2>

            <div className="collection-row">
              {movies.map((movie) => (
                <a
                  key={movie._id}
                  href={`/movie/${movie._id}`}
                  className="collection-card"
                  onClick={(e) =>
                    handleClick(e, movie._id)
                  }
                >
                  <img
                    src={movie.poster}
                    alt={movie.title}
                  />

                  <div className="collection-card-label">
                    {movie.title}
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CollectionPage;