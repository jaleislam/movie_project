import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LightningBackground from "./components/LightningBackground";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import MovieDetail from "./pages/MovieDetail";
import MoviesPage from "./pages/MoviesPage";
import SeriesPage from "./pages/SeriesPage";
import CollectionPage from "./pages/CollectionPage";
import PricingPage from "./pages/PricingPage";
import FaqPage from "./pages/FaqPage";
import WishlistPage from "./pages/WishlistPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./styles/lightning.scss";
import "./styles/layout.scss";
import "./styles/search.scss";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <LightningBackground />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/series" element={<SeriesPage />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;