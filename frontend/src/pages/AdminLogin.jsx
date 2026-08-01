import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaEnvelope,
  FaHouse,
  FaLock,
  FaRightToBracket,
} from "react-icons/fa6";

import MavieLogo from "../components/MavieLogo";
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";
function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
  `${API_URL}/auth/login`,
  {
    email: formData.email.trim(),
    password: formData.password,
  }
);
      localStorage.setItem(
        "mavieAdminToken",
        response.data.token
      );

      localStorage.setItem(
        "mavieAdminUser",
        JSON.stringify(response.data.admin)
      );

      navigate("/dashboard");
    } catch (error) {
      console.error("Admin login error:", error);

      setErrorMessage(
        error.response?.data?.message ||
          "Unable to sign in. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="admin-login-page">
      <div className="container">
        <div className="admin-login-wrapper">
          <div className="admin-login-brand-panel">
            <MavieLogo light />

            <div>
              <span className="admin-panel-label">
                Administration Portal
              </span>

              <h1>
                Manage appointments with clarity and confidence.
              </h1>

              <p>
                Review appointment requests, update statuses, and
                help patients receive timely care.
              </p>
            </div>

            <div className="admin-security-note">
              <FaLock />

              <span>
                Authorized Mavie Medical Center staff only
              </span>
            </div>
          </div>

          <div className="admin-login-card">
            <button
              type="button"
              className="admin-home-button"
              onClick={() => navigate("/")}
            >
              <FaHouse />
              Back to Home
            </button>

            <div className="admin-login-heading">
              <span>Welcome back</span>

              <h2>Administrator Login</h2>

              <p>
                Enter your account details to access the dashboard.
              </p>
            </div>

            {errorMessage && (
              <div className="admin-login-error" role="alert">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="adminEmail"
                  className="form-label"
                >
                  Email Address
                </label>

                <div className="admin-input-wrapper">
                  <FaEnvelope />

                  <input
                    id="adminEmail"
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="admin@mavie.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="adminPassword"
                  className="form-label"
                >
                  Password
                </label>

                <div className="admin-input-wrapper">
                  <FaLock />

                  <input
                    id="adminPassword"
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn admin-login-button"
                disabled={isSubmitting}
              >
                <FaRightToBracket />

                {isSubmitting
                  ? "Signing In..."
                  : "Sign In to Dashboard"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminLogin;