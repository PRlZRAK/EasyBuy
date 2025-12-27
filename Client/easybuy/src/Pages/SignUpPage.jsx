import "./AuthPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("http://localhost:8000/api/auth/register/", formData);

      const tokenResponse = await axios.post(
        "http://127.0.0.1:8000/api/auth/token/",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      localStorage.setItem("access", tokenResponse.data.access);
      localStorage.setItem("refresh", tokenResponse.data.refresh);

      navigate("/");
    } catch (err) {
      setError(
        JSON.stringify(
          err.response.data.password
            ? "Password: " + err.response.data.password
            : err.response.data.email
            ? err.response.data.email
            : err.response.data.username
            ? err.response.data.username
            : ""
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create account</h1>
        <p className="subtitle">Join EasyBuy to buy and sell products</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?
          <Link to="/login"> Log in</Link>
        </div>
      </div>
    </div>
  );
}
