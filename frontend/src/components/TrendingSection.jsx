import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import { getMovies } from "../services/movieService";
import { getWishlist, addToWishlist, removeFromWishlist } from "../services/wishlistService";
import MovieCard from "./MovieCard";
import ScrollRow from "./ScrollRow";

const TrendingSection = () => {
  const [movies, setMovies] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovies({ limit: 10, page: 1 });
        setMovies(data.movies);
      } catch (error) {
        console.error(error);
      }

      if (user) {
        try {
          const wishlist = await getWishlist();
          setWishlistIds(wishlist.map((m) => m._id));
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
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

  if (movies.length === 0) return null;

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">Trends</h2>
        <Link to="/movies" className="section-see-more">
          See More <ArrowRight />
        </Link>
      </div>

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
    </section>
  );
};

export default TrendingSection;