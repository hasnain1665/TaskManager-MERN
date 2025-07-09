import React, { useState } from "react";
import Layout from "./../../components/Layout.js";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Input validation
  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!address.trim()) {
      newErrors.address = "Address is required";
    } else if (address.trim().length < 5) {
      newErrors.address = "Address must be at least 5 characters";
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
      const res = await axios.post("http://localhost:8000/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password,
        phone: phone.trim(),
        address: address.trim(),
      });
      if (res.data.success) {
        toast.success(res.data.message || "Registration successful!");
        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        toast.error(res.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 409) {
        toast.error("Email already exists. Please use a different email.");
      } else if (error.response?.status >= 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value, setter) => {
    setter(value);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Layout title={"Register - Task Manager"}>
      <div className="register-page">
        <div className="bg-shape bg-shape-1"></div>
        <div className="bg-shape bg-shape-2"></div>
        <div className="bg-shape bg-shape-3"></div>
        <div className="bg-shape bg-shape-4"></div>
        <div className="bg-shape bg-shape-5"></div>
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
        <div className="register-container">
          <div className="register-card">
            <div className="register-header">
              <h2 className="register-title">Create Account</h2>
              <p className="register-subtitle">
                Join Task Manager to organize your work
              </p>
            </div>

            <form onSubmit={handleSubmit} className="register-form" noValidate>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  className={`form-input ${errors.name ? "error" : ""}`}
                  placeholder="Enter your full name"
                  onChange={(e) =>
                    handleInputChange("name", e.target.value, setName)
                  }
                  disabled={loading}
                  autoComplete="name"
                  required
                />
                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>

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
                  onChange={(e) =>
                    handleInputChange("email", e.target.value, setEmail)
                  }
                  disabled={loading}
                  autoComplete="email"
                  required
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  className={`form-input ${errors.phone ? "error" : ""}`}
                  placeholder="Enter your phone number"
                  onChange={(e) =>
                    handleInputChange("phone", e.target.value, setPhone)
                  }
                  disabled={loading}
                  autoComplete="tel"
                  required
                />
                {errors.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  className={`form-input ${errors.address ? "error" : ""}`}
                  placeholder="Enter your address"
                  onChange={(e) =>
                    handleInputChange("address", e.target.value, setAddress)
                  }
                  disabled={loading}
                  autoComplete="street-address"
                  required
                />
                {errors.address && (
                  <span className="error-message">{errors.address}</span>
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
                  placeholder="Create a strong password"
                  onChange={(e) =>
                    handleInputChange("password", e.target.value, setPassword)
                  }
                  disabled={loading}
                  autoComplete="new-password"
                  required
                />
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>

              <button type="submit" className="register-btn" disabled={loading}>
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="register-footer">
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => !loading && navigate("/login")}
                  className={`auth-link ${loading ? "disabled" : ""}`}
                >
                  Sign in here
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
