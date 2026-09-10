import { Link } from "react-router";
import "./Header.css";

function Header() {
  return (
    <header className="site-header">
      <nav className="header-nav">
        <Link className="logo" to="/">
          BALLERS
        </Link>

        <div className="nav-links">
          <Link to="/">Hem</Link>
          <Link to="/halls">Våra hallar</Link>
          <Link to="/calendar">Boka hall</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
