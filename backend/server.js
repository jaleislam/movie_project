import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
// .env faylındakı dəyişənləri process.env-ə yükləyir
dotenv.config();

// Database-ə qoşuluruq
connectDB();

const app = express();

// --- Middleware-lər ---
app.use(cors()); // frontend fərqli portdan sorğu göndərə bilsin deyə
app.use(express.json()); // gələn JSON body-ni oxumaq üçün

// --- Test route ---
app.get("/", (req, res) => {
  res.json({ message: "Film sayti API işləyir 🎬" });
});

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/wishlist", wishlistRoutes);

// --- Tapılmayan route-lar üçün ---
app.use((req, res) => {
  res.status(404).json({ message: "Route tapılmadı" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portunda işləyir`);
});