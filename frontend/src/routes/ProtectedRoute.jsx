import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useSelector((state) => state.auth);

  // Login olmayıb -> login sehifesine yonlendir
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admin teleb olunur, amma istifadeci admin deyil -> ana sehifeye yonlendir
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;