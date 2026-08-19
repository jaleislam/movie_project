import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../services/movieService";

const COLLECTION_GENRES = ["Action", "Fantasy", "Horror", "Romance", "Animation", "Crime"];

const CollectionSection = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const results = await Promise.all(
          COLLECTION_GENRES.map((genre) => getMovies({ genre, limit: 1 }))
        );
        const items = COLLECTION_GENRES.map((genre, i) => ({
          genre,
          poster: results[i].movies[0]?.poster,
        })).filter((item) => item.poster);
        setCollections(items);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCollections();
  }, []);

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">Collection</h2>
        <Link to="/collection" className="section-see-more">
          See More →
        </Link>
      </div>

      <div className="collection-row">
        {collections.map((c) => (
          <Link key={c.genre} to={`/collection?genre=${c.genre}`} className="collection-card">
            <img src={c.poster} alt={c.genre} />
            <div className="collection-card-label">{c.genre}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CollectionSection;