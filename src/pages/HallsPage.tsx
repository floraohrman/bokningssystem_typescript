import { Link } from "react-router";

function HallsPage() {
  return (
    <main>
      <h1>Våra hallar</h1>

      <p>Här kan du välja vilken hall du vill boka.</p>

      <section>
        <Link to="/halls/1">Hall 1</Link>
        <Link to="/halls/2">Hall 2</Link>
        <Link to="/halls/3">Hall 3</Link>
      </section>
    </main>
  );
}

export default HallsPage;
