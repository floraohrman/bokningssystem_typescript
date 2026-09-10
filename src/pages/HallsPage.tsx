import { halls } from "../data/halls";
import HallCard from "../components/HallCard";
import "./HallsPage.css";

function HallsPage() {
  return (
    <main className="halls-page">
      <h1>Våra hallar</h1>

      <p className="halls-intro">Här kan du välja vilken hall du vill boka.</p>

      <section className="halls-grid">
        {halls.map((hall) => (
          <HallCard key={hall.id} hall={hall} />
        ))}
      </section>
    </main>
  );
}

export default HallsPage;
