import { useEffect, useState, useRef } from "react";
import logo from "../Easybuy.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "../css/Header.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const [hideHeader, setHideHeader] = useState(false);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);
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

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    navigate(value ? `/?search=${value}` : "/");
  };

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
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearchChange}
          />
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
              {user.is_seller && (
                <Link to="/seller" className="header-seller-link">
                  Seller dashboard
                </Link>
              )}

              <Link to="/cart" className="header-cart-link">
                Cart
              </Link>

              <Link to={`/profile/${user.id}`} className="user-profile">
                {user.avatar ? (
                  <img src={user.avatar} alt="avatar" />
                ) : (
                  <div className="avatar-placeholder">{user.username[0]}</div>
                )}
                <span>{user.username}</span>
              </Link>

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
