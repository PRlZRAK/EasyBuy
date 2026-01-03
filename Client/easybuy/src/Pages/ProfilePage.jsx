import "../css/ProfilePage.css";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const { user, toggleSellerMode, fetchUser, loading } =
    useContext(AuthContext);

  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  if (loading) {
    return <div className="profile-page">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleAvatarClick = () => {
    if (!uploading) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setUploading(true);
      await api.post("/api/me/avatar/", formData);

      await fetchUser();
    } catch (err) {
      alert("Failed to upload avatar");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div
          className={`profile-avatar ${uploading ? "uploading" : ""}`}
          onClick={handleAvatarClick}
        >
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" />
          ) : (
            <div className="profile-avatar-placeholder">{user.username[0]}</div>
          )}

          <div className="avatar-overlay">
            {uploading ? "Uploading..." : "Change"}
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleAvatarChange}
          hidden
        />

        <div className="profile-info">
          <h1>{user.username}</h1>
          <p className="profile-email">{user.email}</p>

          <div className="profile-seller">
            <label className="seller-checkbox">
              <input
                type="checkbox"
                checked={user.is_seller}
                onChange={(e) => toggleSellerMode(e.target.checked)}
              />
              Seller mode
            </label>
            {user.is_seller && (
              <Link to="/seller" className="btn-seller">
                Seller dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
