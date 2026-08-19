import { useState } from "react";
import { createMovie, updateMovie } from "../services/movieService";

const MovieFormModal = ({ movie, onClose, onSuccess }) => {
  const isEditMode = Boolean(movie);

  const [formData, setFormData] = useState({
    title: movie?.title || "",
    description: movie?.description || "",
    poster: movie?.poster || "",
    genre: movie?.genre?.join(", ") || "",
    year: movie?.year || "",
    director: movie?.director || "",
    rating: movie?.rating || "",
    duration: movie?.duration || "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const payload = {
      ...formData,
      year: Number(formData.year),
      rating: Number(formData.rating) || 0,
      duration: Number(formData.duration) || undefined,
      genre: formData.genre
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean),
    };

    try {
      if (isEditMode) {
        await updateMovie(movie._id, payload);
      } else {
        await createMovie(payload);
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Xeta bas verdi");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{isEditMode ? "Filmi redakte et" : "Yeni film elave et"}</h2>

        {error && <p className="admin-error">{error}</p>}

        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            name="title"
            placeholder="Film adi"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Tesvir"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="poster"
            placeholder="Poster URL"
            value={formData.poster}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="genre"
            placeholder="Janrlar (vergul ile ayirin): Action, Drama"
            value={formData.genre}
            onChange={handleChange}
          />

          <input
            type="number"
            name="year"
            placeholder="Il"
            value={formData.year}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="director"
            placeholder="Rejissor"
            value={formData.director}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Reytinq (0-10)"
            value={formData.rating}
            onChange={handleChange}
          />

          <input
            type="number"
            name="duration"
            placeholder="Muddet (deqiqe)"
            value={formData.duration}
            onChange={handleChange}
          />

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Legv et
            </button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "..." : isEditMode ? "Yenile" : "Elave et"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieFormModal;