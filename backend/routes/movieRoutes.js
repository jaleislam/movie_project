import express from "express";
import {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController.js";
import { movieValidation } from "../middleware/validators.js";
import validateRequest from "../middleware/validateRequest.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public route-lar (hər kəs görə bilər)
router.get("/", getMovies);
router.get("/:id", getMovieById);

// Yalnız admin (login + admin rolu tələb olunur)
router.post("/", authMiddleware, adminMiddleware, movieValidation, validateRequest, createMovie);
router.put("/:id", authMiddleware, adminMiddleware, updateMovie);
router.delete("/:id", authMiddleware, adminMiddleware, deleteMovie);

export default router;