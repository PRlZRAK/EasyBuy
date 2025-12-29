import "../css/Footer.css";
import { Link } from "react-router-dom";
import logo from "../Easybuy.png";

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-logo">
          <img src={logo} alt="logo" />
          <p>EasyBuy</p>
        </div>

        <div className="footer-links">
          <div>
            <Link to="/">Become a seller</Link>
          </div>

          <div>
            <Link to="/about">About us</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">© {new Date().getFullYear()} EasyBuy</div>
    </footer>
  );
}
