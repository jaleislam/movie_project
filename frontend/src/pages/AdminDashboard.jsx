import { useState, useEffect } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import MovieFormModal from "../components/MovieFormModal";
import Particles from "../components/Particles";
import "../styles/admin.scss";

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const data = await getMovies({ limit: 100 });
      setMovies(data.movies);
    } catch (error) {
      console.error("Filmleri getirmek mumkun olmadi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Bu filmi silmek isteyirsiniz?")) return;
    try {
      await deleteMovie(id);
      fetchMovies();
    } catch (error) {
      console.error("Silme xetasi:", error);
    }
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingMovie(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingMovie(null);
  };

  const handleModalSuccess = () => {
    handleModalClose();
    fetchMovies();
  };

  return (
    <div className="admin-page">
      <Particles />

      <div className="admin-dashboard">
        <div className="admin-header">
          <h1>Admin Panel — Filmler</h1>
          <button className="admin-add-btn" onClick={handleAddNew}>
            + Yeni film
          </button>
        </div>

        {isLoading ? (
          <p className="admin-loading">Yuklenir...</p>
        ) : (
          <div className="admin-movie-grid">
            {movies.map((movie) => (
              <div key={movie._id} className="admin-movie-card">
                <div className="admin-poster-wrap">
                  <img src={movie.poster} alt={movie.title} className="admin-poster" />
                </div>
                <div className="admin-movie-info">
                  <h3>{movie.title}</h3>
                  <p>
                    {movie.year} · {movie.director}
                  </p>
                  <span className="admin-rating-badge">★ {movie.rating}</span>

                  <div className="admin-card-actions">
                    <button className="admin-edit-btn" onClick={() => handleEdit(movie)}>
                      Redakte et
                    </button>
                    <button className="admin-delete-btn" onClick={() => handleDelete(movie._id)}>
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isModalOpen && (
          <MovieFormModal
            movie={editingMovie}
            onClose={handleModalClose}
            onSuccess={handleModalSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;