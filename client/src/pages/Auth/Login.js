import React, { useState } from "react";
import Layout from "./../../components/Layout.js";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // Input validation
  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/auth/login", {
        email: email.trim(),
        password,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Login successful!");
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));

        setTimeout(() => {
          sessionStorage.setItem("justLoggedIn", "true");
          navigate(location.state || "/home");
        }, 500);
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 401) {
        toast.error("Invalid email or password");
      } else if (error.response?.status >= 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  return (
    <Layout title={"Login - Task Manager"}>
      <div className="login-page">
        <div className="bg-shape bg-shape-1"></div>
        <div className="bg-shape bg-shape-2"></div>
        <div className="bg-shape bg-shape-3"></div>
        <div className="bg-shape bg-shape-4"></div>
        <div className="grid-overlay"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <h2 className="login-title">Welcome Back</h2>
              <p className="login-subtitle">
                Sign in to your Task Manager account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="login-form" noValidate>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  className={`form-input ${errors.email ? "error" : ""}`}
                  placeholder="Enter your email address"
                  onChange={handleEmailChange}
                  disabled={loading}
                  autoComplete="email"
                  required
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  className={`form-input ${errors.password ? "error" : ""}`}
                  placeholder="Enter your password"
                  onChange={handlePasswordChange}
                  disabled={loading}
                  autoComplete="current-password"
                  required
                />
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="login-footer">
              <p>
                Don't have an account?{" "}
                <span
                  onClick={() => !loading && navigate("/register")}
                  className={`auth-link ${loading ? "disabled" : ""}`}
                >
                  Create one here
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
