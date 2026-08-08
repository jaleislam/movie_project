import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav>
      <Link to="/">Ana sehife</Link>

      {user ? (
        <>
          <span>Salam, {user.name}</span>
          {user.role === "admin" && <Link to="/admin">Admin panel</Link>}
          <Link to="/wishlist">Wishlist</Link>
          <button onClick={handleLogout}>Cixis</button>
        </>
      ) : (
        <>
          <Link to="/login">Giris</Link>
          <Link to="/register">Qeydiyyat</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;