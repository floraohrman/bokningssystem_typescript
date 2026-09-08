import { Link } from "react-router";

export default function HomePage() {
  return (
    <main>
       <h1>Välkommen till BALLERS</h1>
      <p>Boka din hall för fotboll, handboll eller innebandy</p>

      <Link to="/calendar">
        Gå till bokning
      </Link>
    </main>
  );
}
