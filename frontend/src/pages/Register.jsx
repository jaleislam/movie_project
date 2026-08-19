import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, clearError } from "../redux/slices/authSlice";
import Particles from "../components/Particles";
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

const AVATAR_OPTIONS = [
  "/images/avatars/avatar1.png",
  "/images/avatars/avatar2.png",
  "/images/avatars/avatar3.png",
  "/images/avatars/avatar4.png",
  "/images/avatars/avatar5.png",
];

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState("form"); // "form" | "avatar" | "success"
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [localError, setLocalError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    setLocalError("");

    if (formData.password !== formData.confirmPassword) {
      setLocalError("Sifreler uygun gelmir");
      return;
    }

    const result = await dispatch(
      register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
    );

    if (register.fulfilled.match(result)) {
      setStep("avatar");
    }
  };

  const handleAvatarConfirm = () => {
    setStep("success");
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="auth-page">
      <Particles />

      <div className="auth-card">
        <Link to="/" className="auth-back">
          &#8592;
        </Link>

        <div className="auth-form-panel">
          {step === "form" && (
            <>
              <h1 className="auth-title">Welcome</h1>

              <div className="auth-tabs">
                <Link to="/login" className="auth-tab">
                  LOGIN
                </Link>
                <span className="auth-tab active">SIGNUP</span>
              </div>

              {(error || localError) && (
                <p className="auth-error">{error || localError}</p>
              )}

              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="auth-input-wrapper">
                  <input
                    className="auth-input"
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

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

                <div className="auth-input-wrapper">
                  <input
                    className="auth-input auth-input--password"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Repeat the password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="auth-eye-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                  >
                    <EyeIcon open={showConfirmPassword} />
                  </button>
                </div>

                <div className="auth-input-wrapper">
                  <input
                    className="auth-input"
                    type="text"
                    name="username"
                    placeholder="UserName"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button className="auth-submit-btn" type="submit" disabled={isLoading}>
                  {isLoading ? "..." : "Confirm"}
                </button>
              </form>
            </>
          )}

          {step === "avatar" && (
            <div className="auth-success">
              <p className="auth-success-text">Hi {formData.username}</p>
              <div className="auth-avatar-circle">
                {selectedAvatar && (
                  <img className="auth-avatar-img" src={selectedAvatar} alt="avatar" />
                )}
              </div>
              <p className="auth-username-text">choose your profile</p>

              <div className="auth-avatar-grid">
                {AVATAR_OPTIONS.map((avatar) => (
                  <div
                    key={avatar}
                    className={`auth-avatar-option ${
                      selectedAvatar === avatar ? "selected" : ""
                    }`}
                    onClick={() => setSelectedAvatar(avatar)}
                  >
                    <img src={avatar} alt="avatar option" />
                  </div>
                ))}
              </div>

              <button className="auth-submit-btn" onClick={handleAvatarConfirm}>
                Confirm
              </button>
            </div>
          )}

          {step === "success" && (
            <div className="auth-success">
              <div className="auth-avatar-circle">
                {selectedAvatar && (
                  <img className="auth-avatar-img" src={selectedAvatar} alt="avatar" />
                )}
              </div>
              <p className="auth-username-text">{user?.name}</p>
              <p className="auth-success-text">
                Your account has been successfully created
              </p>
            </div>
          )}
        </div>

        <div className="auth-image-panel">
          <img className="auth-image" src="/images/login-bg.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Register;