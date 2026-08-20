import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Search, User, Sun, Moon, Menu, X, ShieldCheck, LogOut, UserPlus, Heart } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { logout } from "../redux/slices/authSlice";
import SearchOverlay from "./SearchOverlay";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Pricing", path: "/pricing" },
  { label: "Movies", path: "/movies" },
  { label: "Series", path: "/series" },
  { label: "Collection", path: "/collection" },
  { label: "FAQ", path: "/faq" },
];

const HIDDEN_ON = ["/login", "/register"];

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accountRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (HIDDEN_ON.includes(location.pathname)) return null;

  const handleLogout = () => {
    dispatch(logout());
    setAccountMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="header-logo" onClick={closeMenu}>
            <Logo size={32} />
          </Link>

          <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`header-link ${location.pathname === link.path ? "active" : ""}`}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <button className="header-icon-btn" onClick={() => setSearchOpen(true)} aria-label="Axtar">
              <Search size={19} />
            </button>

            <div className="header-account-wrapper" ref={accountRef}>
              <button
                className="header-icon-btn"
                onClick={() => setAccountMenuOpen((prev) => !prev)}
                aria-label="Hesab"
              >
                <User size={19} />
              </button>

              {accountMenuOpen && (
                <div className="header-account-dropdown">
                  {user ? (
                    <>
                      <p className="header-account-name">{user.name}</p>
                      <Link
                        to="/wishlist"
                        className="header-account-link"
                        onClick={() => setAccountMenuOpen(false)}
                      >
                        <Heart size={16} /> Wishlist
                      </Link>
                      {user.role === "admin" && (
                        <Link
                          to="/admin"
                          className="header-account-link"
                          onClick={() => setAccountMenuOpen(false)}
                        >
                          <ShieldCheck size={16} /> Admin panel
                        </Link>
                      )}
                      <button className="header-account-link header-account-logout" onClick={handleLogout}>
                        <LogOut size={16} /> Cixis
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="header-account-link"
                        onClick={() => setAccountMenuOpen(false)}
                      >
                        <User size={16} /> Giris
                      </Link>
                      <Link
                        to="/register"
                        className="header-account-link"
                        onClick={() => setAccountMenuOpen(false)}
                      >
                        <UserPlus size={16} /> Qeydiyyat
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <button className="header-icon-btn" onClick={toggleTheme} aria-label="Temani deyis">
              {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            <button className="header-burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menyu">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  );
};

export default Header;