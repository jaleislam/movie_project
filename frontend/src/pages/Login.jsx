import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../redux/slices/authSlice";
import Particles from "../components/Particles";
import AuthArt from "../components/AuthArt";
import "../styles/auth.scss";

const EyeIcon = ({ open }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    {open ? (
      <>
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.94 10.94 0 0112 19c-7 0-11-7-11-7a21.6 21.6 0 015.06-6.06M9.9 4.24A10.4 10.4 0 0112 4c7 0 11 7 11 7a21.6 21.6 0 01-3.15 4.19M14.12 14.12a3 3 0 11-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

const Login = () => {
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || "/";

  const [formData, setFormData] = useState({
    email: location.state?.prefillEmail || "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState("form");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    const result = await dispatch(login(formData));

    if (login.fulfilled.match(result)) {
      setStep("success");
      setTimeout(() => navigate(redirectTo), 1200);
    }
  };

  return (
    <div className="auth-page">
      <Particles />

      <div className="auth-card">
        <Link to="/" className="auth-back">
          &#8592;
        </Link>

        <div className="auth-form-panel">
          {step === "form" ? (
            <>
              <h1 className="auth-title">Welcome</h1>

              <div className="auth-tabs">
                <span className="auth-tab active">LOGIN</span>
                <Link to="/register" className="auth-tab">
                  SIGNUP
                </Link>
              </div>

              {location.state?.prefillEmail && (
                <p className="auth-info-note">Hesabin yaradildi, indi sifreni yaz</p>
              )}

              {error && <p className="auth-error">{error}</p>}

              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="auth-input-wrapper">
                  <input
                    className="auth-input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="auth-input-wrapper">
                  <input
                    className="auth-input auth-input--password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="auth-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </div>

                <a className="auth-forgot" href="#">
                  Forgot Password?
                </a>

                <button className="auth-submit-btn" type="submit" disabled={isLoading}>
                  {isLoading ? "..." : "LOGIN"}
                </button>
              </form>
            </>
          ) : (
            <div className="auth-success">
              <p className="auth-username-text">{user?.name}</p>
              <p className="auth-success-text">You have successfully logged in</p>
            </div>
          )}
        </div>

        <div className="auth-image-panel">
          <AuthArt />
        </div>
      </div>
    </div>
  );
};

export default Login;