import "../css/AuthPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { fetchUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    isSeller: false,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api.post("/api/auth/register/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      const tokenResponse = await api.post("/api/auth/token/", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("access", tokenResponse.data.access);
      localStorage.setItem("refresh", tokenResponse.data.refresh);

      if (formData.isSeller) {
        await api.patch("/api/me/seller-mode/", { is_seller: true });
      }
      await fetchUser();
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
          <label className="seller-checkbox">
            <input
              type="checkbox"
              name="isSeller"
              checked={formData.isSeller}
              onChange={handleChange}
            />
            I want to sell products on EasyBuy
          </label>

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
