import { halls } from "../data/halls";
import HallCard from "../components/HallCard";

function HallsPage() {
  return (
    <main>
      <h1>Våra hallar</h1>

      <p>Här kan du välja vilken hall du vill boka.</p>

      <section>
        {halls.map((hall) => (
          <HallCard key={hall.id} hall={hall} />
        ))}
      </section>
    </main>
  );
}

export default HallsPage;
