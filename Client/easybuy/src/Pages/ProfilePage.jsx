import "../css/ProfilePage.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProfilePage() {
  const { user, toggleSellerMode, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="profile-page">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" />
          ) : (
            <div className="profile-avatar-placeholder">{user.username[0]}</div>
          )}
        </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
