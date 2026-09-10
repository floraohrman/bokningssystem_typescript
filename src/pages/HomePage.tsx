import { Link } from "react-router";
import "./HomePage.css";

function HomePage() {
  return (
    <main className="home-page">
      <section className="hero">
        <h1>Välkommen till BALLERS</h1>

        <p>Boka din sporthall för fotboll, handboll eller innebandy.</p>

        <div className="home-buttons">
          <Link to="/halls">Våra hallar</Link>
          <Link to="/calendar">Boka hall</Link>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
