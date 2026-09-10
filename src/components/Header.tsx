import { Link } from "react-router";

function Header() {
  return (
    <header>
      <nav>
        <Link to="/">BALLERS</Link>

        <div>
          <Link to="/">Hem</Link>
          <Link to="/halls">Våra hallar</Link>
          <Link to="/calendar">Boka hall</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
