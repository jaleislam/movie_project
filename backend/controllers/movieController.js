import Movie from "../models/Movie.js";

// @route   GET /api/movies
// @desc    Bütün filmləri gətirir (pagination + axtarış dəstəyi ilə)
export const getMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Axtarış (title üzrə) — istəyə bağlı query parametri
    const searchQuery = req.query.search
      ? { title: { $regex: req.query.search, $options: "i" } }
      : {};

    // Janr filtri — istəyə bağlı
       const genreQuery = req.query.genre ? { genre: req.query.genre } : {};
    const yearQuery = req.query.year ? { year: Number(req.query.year) } : {};

    const filter = { ...searchQuery, ...genreQuery, ...yearQuery };

    const totalMovies = await Movie.countDocuments(filter);

    const movies = await Movie.find(filter)
      .sort({ createdAt: -1 }) // ən yeni filmlər əvvəldə
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      movies,
      currentPage: page,
      totalPages: Math.ceil(totalMovies / limit),
      totalMovies,
    });
  } catch (error) {
    res.status(500).json({ message: "Server xətası", error: error.message });
  }
};

// @route   GET /api/movies/:id
// @desc    Tək film
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Film tapılmadı" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Server xətası", error: error.message });
  }
};

// @route   POST /api/movies
// @desc    Yeni film yaradır (yalnız admin)
export const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).json({ message: "Film uğurla əlavə olundu", movie });
  } catch (error) {
    res.status(500).json({ message: "Server xətası", error: error.message });
  }
};

// @route   PUT /api/movies/:id
// @desc    Filmi yeniləyir (yalnız admin)
export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // yenilənmiş sənədi qaytarır
      runValidators: true, // model-dəki required/min və s. qaydaları yoxlayır
    });

    if (!movie) {
      return res.status(404).json({ message: "Film tapılmadı" });
    }

    res.status(200).json({ message: "Film yeniləndi", movie });
  } catch (error) {
    res.status(500).json({ message: "Server xətası", error: error.message });
  }
};

// @route   DELETE /api/movies/:id
// @desc    Filmi silir (yalnız admin)
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Film tapılmadı" });
    }
    res.status(200).json({ message: "Film silindi" });
  } catch (error) {
    res.status(500).json({ message: "Server xətası", error: error.message });
  }
};