import { useEffect, useState, useRef } from "react";
import logo from "../Easybuy.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Header.css";

export default function Header() {
  const [hideHeader, setHideHeader] = useState(false);
  const [user, setUser] = useState(null);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 80) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
      }
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const access = localStorage.getItem("access");
    if (!access) return;

    const fetchUser = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/me/", {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.log("Failed to fetch user: " + error);
      }
    };

    fetchUser();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <header className={`header ${hideHeader ? "hidden" : ""}`}>
        <div className="logo">
          <Link to="/" className="logo">
            <img src={logo} alt="logo" />
            EasyBuy
          </Link>
        </div>

        <div className="search-box">
          <input type="text" placeholder="Search products..." />
        </div>

        <div className="auth-buttons">
          {!user ? (
            <>
              <Link to="/login" className="btn-login">
                Login
              </Link>
              <Link to="/register" className="btn-signup">
                Sign up
              </Link>
            </>
          ) : (
            <div className="user-info">
              <div className="user-profile">
                {user.avatar ? (
                  <img src={user.avatar} alt="avatar" />
                ) : (
                  <div className="avatar-placeholder">{user.username[0]}</div>
                )}
                <span>{user.username}</span>
              </div>

              <button className="btn-logout" onClick={handleLogout}>
                Log out
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
