import { useEffect, useState, useRef } from "react";
import logo from "../Easybuy.png";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [hideHeader, setHideHeader] = useState(false);
  const lastScrollY = useRef(0);
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
          <Link to="/login" className="btn-login">
            Login
          </Link>
          <Link to="/register" className="btn-signup">
            Sign up
          </Link>
        </div>
      </header>
    </>
  );
}
