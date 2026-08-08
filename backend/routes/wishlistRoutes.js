import express from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Butun route-lar login teleb edir
router.get("/", authMiddleware, getWishlist);
router.post("/:movieId", authMiddleware, addToWishlist);
router.delete("/:movieId", authMiddleware, removeFromWishlist);

export default router;